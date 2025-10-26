"use client"

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CELOSAVE_CONTRACT_ADDRESS, CUSD_ADDRESS } from "@/lib/celo/config"
import { CELOSAVE_ABI, ERC20_ABI } from "@/lib/celo/contract-abi"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import type { SavingsGoal } from "@/lib/celo/types"

export function useBlockchainContract() {
  const { address, chain } = useAccount()
  const [isApproving, setIsApproving] = useState(false)

  const contractAddress = chain?.id === 44787 ? CELOSAVE_CONTRACT_ADDRESS.alfajores : CELOSAVE_CONTRACT_ADDRESS.mainnet

  const cUSDAddress = chain?.id === 44787 ? CUSD_ADDRESS.alfajores : CUSD_ADDRESS.mainnet

  const isContractDeployed = contractAddress !== "0x0000000000000000000000000000000000000000"

  // Read user goals from blockchain
  const {
    data: userGoals,
    isLoading: isLoadingGoals,
    refetch: refetchGoals,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CELOSAVE_ABI,
    functionName: "getUserGoals",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isContractDeployed,
    },
  })

  // Read total savings
  const { data: totalSavings, refetch: refetchTotalSavings } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CELOSAVE_ABI,
    functionName: "getTotalSavings",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isContractDeployed,
    },
  })

  // Read user streak
  const { data: userStreak, refetch: refetchStreak } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CELOSAVE_ABI,
    functionName: "getUserStreak",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isContractDeployed,
    },
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Refetch data after successful transaction
  useEffect(() => {
    if (isSuccess) {
      refetchGoals()
      refetchTotalSavings()
      refetchStreak()
    }
  }, [isSuccess, refetchGoals, refetchTotalSavings, refetchStreak])

  const createGoal = async (name: string, targetAmount: bigint, deadline: bigint) => {
    if (!isContractDeployed) {
      throw new Error("Contract not deployed. Please deploy the contract first.")
    }

    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: CELOSAVE_ABI,
        functionName: "createSavingsGoal",
        args: [name, targetAmount, deadline],
      })

      toast.success("Goal created successfully!")
    } catch (error: any) {
      console.error("Error creating goal:", error)
      toast.error(`Error creating goal: ${error.message}`)
      throw error
    }
  }

  const approveAndSave = async (goalId: bigint, amount: bigint) => {
    if (!isContractDeployed) {
      throw new Error("Contract not deployed. Please deploy the contract first.")
    }

    try {
      setIsApproving(true)

      // First approve cUSD spending
      toast.info("Step 1/2: Approving cUSD...")
      writeContract({
        address: cUSDAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [contractAddress as `0x${string}`, amount],
      })

      // Wait for approval to complete
      await new Promise((resolve) => {
        const checkApproval = setInterval(() => {
          if (isSuccess) {
            clearInterval(checkApproval)
            resolve(true)
          }
        }, 1000)
      })

      // Then save to goal
      toast.info("Step 2/2: Saving to goal...")
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: CELOSAVE_ABI,
        functionName: "saveToGoal",
        args: [goalId, amount],
      })

      toast.success("Saved to goal successfully!")
    } catch (error: any) {
      console.error("Error saving to goal:", error)
      toast.error(`Error: ${error.message}`)
      throw error
    } finally {
      setIsApproving(false)
    }
  }

  const withdraw = async (goalId: bigint, amount: bigint) => {
    if (!isContractDeployed) {
      throw new Error("Contract not deployed. Please deploy the contract first.")
    }

    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: CELOSAVE_ABI,
        functionName: "withdraw",
        args: [goalId, amount],
      })

      toast.success("Withdrawal successful!")
    } catch (error: any) {
      console.error("Error withdrawing:", error)
      toast.error(`Error: ${error.message}`)
      throw error
    }
  }

  const deleteGoal = async (goalId: bigint) => {
    if (!isContractDeployed) {
      throw new Error("Contract not deployed. Please deploy the contract first.")
    }

    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: CELOSAVE_ABI,
        functionName: "deleteGoal",
        args: [goalId],
      })

      toast.success("Goal deleted successfully!")
    } catch (error: any) {
      console.error("Error deleting goal:", error)
      toast.error(`Error: ${error.message}`)
      throw error
    }
  }

  // Convert blockchain data to SavingsGoal format
  const formattedGoals: SavingsGoal[] = userGoals
    ? (userGoals as any[]).map((goal) => ({
        id: goal.id,
        name: goal.name,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        deadline: goal.deadline,
        createdAt: goal.createdAt,
        isActive: goal.isActive,
        streak: goal.streak,
      }))
    : []

  return {
    userGoals: formattedGoals,
    totalSavings: totalSavings || 0n,
    userStreak: userStreak || 0n,
    isLoadingGoals,
    contractAddress,
    isContractDeployed,

    createGoal,
    saveToGoal: approveAndSave,
    withdraw,
    deleteGoal,

    refetchGoals,
    refetchTotalSavings,
    refetchStreak,

    isPending: isPending || isConfirming || isApproving,
    isSuccess,
  }
}
