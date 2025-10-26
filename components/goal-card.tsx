"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  formatCUSD,
  calculateGoalProgress,
  formatDeadline,
  getGoalStatus,
  isGoalCompleted,
} from "@/lib/celo/contract-utils"
import type { SavingsGoal } from "@/lib/celo/types"
import { SaveToGoalDialog } from "@/components/save-to-goal-dialog"
import { WithdrawDialog } from "@/components/withdraw-dialog"
import { useCeloSaveContract } from "@/hooks/use-celosave-contract"
import { Calendar, TrendingUp, CheckCircle2, Trash2 } from "lucide-react"
import { useState } from "react"

interface GoalCardProps {
  goal: SavingsGoal
  isCompleted?: boolean
}

export function GoalCard({ goal, isCompleted = false }: GoalCardProps) {
  const { deleteGoal } = useCeloSaveContract()
  const [isDeleting, setIsDeleting] = useState(false)

  const progress = calculateGoalProgress(goal)
  const status = getGoalStatus(goal)
  const completed = isGoalCompleted(goal)

  const statusColors = {
    Completed: "bg-success text-success-foreground",
    Overdue: "bg-destructive text-destructive-foreground",
    Urgent: "bg-warning text-warning-foreground",
    "Almost There": "bg-chart-2 text-foreground",
    "On Track": "bg-primary text-primary-foreground",
    "In Progress": "bg-muted text-muted-foreground",
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteGoal(goal.id)
    } catch (error) {
      console.error("Error deleting goal:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 break-words">{goal.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span className="break-words">{formatDeadline(goal.deadline)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Goal</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{goal.name}"? This action cannot be undone.
                    {goal.currentAmount > 0n && (
                      <span className="block mt-2 text-warning font-semibold">
                        Warning: This goal has {formatCUSD(goal.currentAmount)} cUSD saved. Make sure to withdraw before
                        deleting.
                      </span>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{progress.percentage.toFixed(0)}%</span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
          <div className="flex items-center justify-between text-sm flex-wrap gap-1">
            <span className="text-foreground font-medium break-words">{formatCUSD(goal.currentAmount)} cUSD</span>
            <span className="text-muted-foreground break-words">of {formatCUSD(goal.targetAmount)} cUSD</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1 min-w-0">
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-sm font-semibold text-foreground break-words">{formatCUSD(progress.remaining)} cUSD</p>
          </div>
          <div className="space-y-1 min-w-0">
            <p className="text-xs text-muted-foreground">Days Left</p>
            <p className="text-sm font-semibold text-foreground">{progress.daysLeft} days</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 flex-wrap">
          {!completed && (
            <SaveToGoalDialog goalId={goal.id} goalName={goal.name}>
              <Button className="flex-1 min-w-[100px] bg-primary text-primary-foreground hover:bg-primary/90">
                <TrendingUp className="h-4 w-4 mr-2" />
                Save
              </Button>
            </SaveToGoalDialog>
          )}
          {goal.currentAmount > 0n && (
            <WithdrawDialog goalId={goal.id} goalName={goal.name} currentAmount={goal.currentAmount}>
              <Button variant="outline" className={completed ? "flex-1 min-w-[100px]" : "min-w-[100px]"}>
                Withdraw
              </Button>
            </WithdrawDialog>
          )}
          {completed && (
            <div className="flex-1 flex items-center justify-center gap-2 text-success min-w-[150px]">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span className="font-semibold">Goal Reached!</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
