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
import { parseCUSD, formatCUSD } from "@/lib/celo/contract-utils"
import { Loader2 } from "lucide-react"

interface WithdrawDialogProps {
  goalId: bigint
  goalName: string
  currentAmount: bigint
  children: React.ReactNode
}

export function WithdrawDialog({ goalId, goalName, currentAmount, children }: WithdrawDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState("")

  const { withdraw } = useCeloSaveContract()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await withdraw(goalId, parseCUSD(amount))

      setAmount("")
      setOpen(false)
    } catch (error) {
      console.error("Error withdrawing:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const maxAmount = formatCUSD(currentAmount, 18)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw from {goalName}</DialogTitle>
          <DialogDescription>
            Withdraw funds from your savings goal. Available: {formatCUSD(currentAmount)} cUSD
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (cUSD)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              step="0.01"
              min="0.01"
              max={maxAmount}
              placeholder="10.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Button
              type="button"
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={() => setAmount(maxAmount)}
            >
              Withdraw all
            </Button>
          </div>

          <Button type="submit" className="w-full bg-transparent" variant="outline" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Withdrawing...
              </>
            ) : (
              "Withdraw"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
