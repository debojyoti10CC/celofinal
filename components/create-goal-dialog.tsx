"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCeloSaveContract } from "@/hooks/use-celosave-contract"
import { parseCUSD } from "@/lib/celo/contract-utils"
import { Loader2 } from "lucide-react"

interface CreateGoalDialogProps {
  children: React.ReactNode
}

export function CreateGoalDialog({ children }: CreateGoalDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
  })

  const { createGoal } = useCeloSaveContract()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const deadlineDate = new Date(formData.deadline)
      const deadlineTimestamp = BigInt(Math.floor(deadlineDate.getTime() / 1000))

      await createGoal(formData.name, parseCUSD(formData.targetAmount), deadlineTimestamp)

      setFormData({ name: "", targetAmount: "", deadline: "" })
      setOpen(false)
    } catch (error) {
      console.error("Error creating goal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Savings Goal</DialogTitle>
          <DialogDescription>Set a new savings target and deadline to track your progress.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input
              id="name"
              placeholder="e.g., Emergency Fund"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Target Amount (cUSD)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="100.00"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Goal"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
