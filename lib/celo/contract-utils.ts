import { formatUnits, parseUnits } from "viem"
import type { SavingsGoal, GoalProgress } from "./types"

/**
 * Format cUSD amount from wei to human-readable string
 */
export function formatCUSD(amount: bigint, decimals = 2): string {
  const formatted = formatUnits(amount, 18)
  return Number.parseFloat(formatted).toFixed(decimals)
}

/**
 * Parse cUSD amount from string to wei
 */
export function parseCUSD(amount: string): bigint {
  return parseUnits(amount, 18)
}

/**
 * Calculate goal progress metrics
 */
export function calculateGoalProgress(goal: SavingsGoal): GoalProgress {
  const percentage = goal.targetAmount > 0n ? Number((goal.currentAmount * 100n) / goal.targetAmount) : 0

  const remaining = goal.targetAmount - goal.currentAmount

  const now = Math.floor(Date.now() / 1000)
  const deadlineSeconds = Number(goal.deadline)
  const daysLeft = Math.max(0, Math.ceil((deadlineSeconds - now) / 86400))

  const isOverdue = deadlineSeconds < now && goal.currentAmount < goal.targetAmount

  return {
    percentage: Math.min(100, percentage),
    remaining,
    daysLeft,
    isOverdue,
  }
}

/**
 * Format deadline as human-readable date
 */
export function formatDeadline(deadline: bigint): string {
  const date = new Date(Number(deadline) * 1000)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Calculate daily savings needed to reach goal
 */
export function calculateDailySavingsNeeded(goal: SavingsGoal): bigint {
  const remaining = goal.targetAmount - goal.currentAmount
  if (remaining <= 0n) return 0n

  const now = Math.floor(Date.now() / 1000)
  const deadlineSeconds = Number(goal.deadline)
  const daysLeft = Math.max(1, Math.ceil((deadlineSeconds - now) / 86400))

  return remaining / BigInt(daysLeft)
}

/**
 * Check if goal is completed
 */
export function isGoalCompleted(goal: SavingsGoal): boolean {
  return goal.currentAmount >= goal.targetAmount
}

/**
 * Get goal status text
 */
export function getGoalStatus(goal: SavingsGoal): string {
  if (isGoalCompleted(goal)) return "Completed"

  const progress = calculateGoalProgress(goal)
  if (progress.isOverdue) return "Overdue"
  if (progress.daysLeft <= 7) return "Urgent"
  if (progress.percentage >= 75) return "Almost There"
  if (progress.percentage >= 50) return "On Track"

  return "In Progress"
}
