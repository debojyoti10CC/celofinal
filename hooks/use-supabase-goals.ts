"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { SavingsGoalRow } from "@/lib/supabase/types"
import type { SavingsGoal } from "@/lib/celo/types"
import { parseUnits, formatUnits } from "viem"
import { toast } from "sonner"

export function useSupabaseGoals(userAddress: string | undefined) {
  const [goals, setGoals] = useState<SavingsGoal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const uuidToBigInt = (uuid: string): bigint => {
    try {
      // Remove hyphens and take first 16 hex characters
      const hex = uuid.replace(/-/g, "").slice(0, 16)
      return BigInt("0x" + hex)
    } catch (error) {
      console.error("Error converting UUID to BigInt:", uuid, error)
      return BigInt(0)
    }
  }

  // Convert database row to SavingsGoal type
  const rowToGoal = (row: SavingsGoalRow): SavingsGoal => {
    try {
      return {
        id: uuidToBigInt(row.id),
        name: row.name,
        targetAmount: parseUnits(String(row.target_amount), 18),
        currentAmount: parseUnits(String(row.current_amount), 18),
        deadline: BigInt(row.deadline),
        owner: row.user_address as `0x${string}`,
        completed: row.completed,
        createdAt: BigInt(row.created_at),
        isActive: !row.completed, // Active if not completed
        streak: BigInt(0), // Not tracked in Supabase yet
      }
    } catch (error) {
      console.error("Error converting row to goal:", row, error)
      throw error
    }
  }

  // Convert SavingsGoal to database row
  const goalToRow = (
    goal: Partial<SavingsGoal> & { name: string; targetAmount: bigint; deadline: bigint },
    address: string,
  ) => {
    try {
      return {
        user_address: address,
        name: goal.name,
        target_amount: formatUnits(goal.targetAmount, 18),
        current_amount: goal.currentAmount ? formatUnits(goal.currentAmount, 18) : "0",
        deadline: goal.deadline.toString(),
        created_at: (goal.createdAt || BigInt(Math.floor(Date.now() / 1000))).toString(),
        completed: goal.completed || false,
      }
    } catch (error) {
      console.error("Error converting goal to row:", goal, error)
      throw error
    }
  }

  // Fetch goals from Supabase
  const fetchGoals = async () => {
    if (!userAddress) {
      setGoals([])
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_address", userAddress)
        .order("created_at_timestamp", { ascending: false })

      if (error) throw error

      const mappedGoals = (data || []).map(rowToGoal)
      setGoals(mappedGoals)
    } catch (error) {
      console.error("Error fetching goals:", error)
      toast.error("Failed to load goals")
    } finally {
      setIsLoading(false)
    }
  }

  const createGoal = async (name: string, targetAmount: bigint, deadline: bigint) => {
    if (!userAddress) {
      toast.error("Please connect your wallet")
      return
    }

    try {
      const newGoalData = goalToRow(
        {
          name,
          targetAmount,
          deadline,
          currentAmount: BigInt(0),
          completed: false,
          createdAt: BigInt(Math.floor(Date.now() / 1000)),
        },
        userAddress,
      )

      const { data, error } = await supabase.from("savings_goals").insert(newGoalData).select().single()

      if (error) throw error

      await fetchGoals()

      toast.success("Goal created successfully!")
      return rowToGoal(data)
    } catch (error) {
      console.error("Error creating goal:", error)
      toast.error("Failed to create goal")
      throw error
    }
  }

  // Save to a goal
  const saveToGoal = async (goalId: bigint, amount: bigint) => {
    if (!userAddress) {
      toast.error("Please connect your wallet")
      return
    }

    try {
      const { data: allGoals, error: fetchError } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_address", userAddress)

      if (fetchError) throw fetchError

      const dbGoal = allGoals?.find((g) => uuidToBigInt(g.id) === goalId)
      if (!dbGoal) {
        console.error("Goal not found. Looking for ID:", goalId.toString())
        console.error(
          "Available goals:",
          allGoals?.map((g) => ({ id: g.id, convertedId: uuidToBigInt(g.id).toString() })),
        )
        throw new Error("Goal not found in database")
      }

      const currentGoal = rowToGoal(dbGoal)
      const newAmount = currentGoal.currentAmount + amount

      // Only mark as completed if target amount is reached
      const completed = newAmount >= currentGoal.targetAmount

      const { error } = await supabase
        .from("savings_goals")
        .update({
          current_amount: formatUnits(newAmount, 18),
          completed,
        })
        .eq("id", dbGoal.id)

      if (error) throw error

      await fetchGoals()

      if (completed) {
        toast.success(`🎉 Goal "${currentGoal.name}" completed! You reached your target!`)
      } else {
        toast.success(`Saved ${formatUnits(amount, 18)} cUSD to ${currentGoal.name}!`)
      }
    } catch (error) {
      console.error("Error saving to goal:", error)
      toast.error("Failed to save to goal")
      throw error
    }
  }

  // Withdraw from a goal
  const withdrawFromGoal = async (goalId: bigint, amount: bigint) => {
    if (!userAddress) {
      toast.error("Please connect your wallet")
      return
    }

    try {
      const { data: allGoals, error: fetchError } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_address", userAddress)

      if (fetchError) throw fetchError

      const dbGoal = allGoals?.find((g) => uuidToBigInt(g.id) === goalId)
      if (!dbGoal) throw new Error("Goal not found in database")

      const currentGoal = rowToGoal(dbGoal)

      if (amount > currentGoal.currentAmount) {
        toast.error("Cannot withdraw more than current amount")
        return
      }

      const newAmount = currentGoal.currentAmount - amount

      // Unmark as completed if amount drops below target
      const completed = newAmount >= currentGoal.targetAmount

      const { error } = await supabase
        .from("savings_goals")
        .update({
          current_amount: formatUnits(newAmount, 18),
          completed,
        })
        .eq("id", dbGoal.id)

      if (error) throw error

      await fetchGoals()

      toast.success(`Withdrew ${formatUnits(amount, 18)} cUSD from ${currentGoal.name}!`)
    } catch (error) {
      console.error("Error withdrawing from goal:", error)
      toast.error("Failed to withdraw from goal")
      throw error
    }
  }

  // Delete a goal
  const deleteGoal = async (goalId: bigint) => {
    if (!userAddress) {
      toast.error("Please connect your wallet")
      return
    }

    try {
      const { data: allGoals, error: fetchError } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_address", userAddress)

      if (fetchError) throw fetchError

      const dbGoal = allGoals?.find((g) => uuidToBigInt(g.id) === goalId)
      if (!dbGoal) throw new Error("Goal not found in database")

      const { error } = await supabase.from("savings_goals").delete().eq("id", dbGoal.id)

      if (error) throw error

      await fetchGoals()

      toast.success("Goal deleted successfully!")
    } catch (error) {
      console.error("Error deleting goal:", error)
      toast.error("Failed to delete goal")
      throw error
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [userAddress])

  return {
    goals,
    isLoading,
    createGoal,
    saveToGoal,
    withdrawFromGoal,
    deleteGoal,
    refetch: fetchGoals,
  }
}
