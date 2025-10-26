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

interface SaveToGoalDialogProps {
  goalId: bigint
  goalName: string
  children: React.ReactNode
}

export function SaveToGoalDialog({ goalId, goalName, children }: SaveToGoalDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState("")

  const { saveToGoal } = useCeloSaveContract()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await saveToGoal(goalId, parseCUSD(amount))

      setAmount("")
      setOpen(false)
    } catch (error) {
      console.error("Error saving to goal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save to {goalName}</DialogTitle>
          <DialogDescription>
            Add funds to your savings goal. This will transfer cUSD from your wallet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="save-amount">Amount (cUSD)</Label>
            <Input
              id="save-amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="10.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
                Saving...
              </>
            ) : (
              "Save Now"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
