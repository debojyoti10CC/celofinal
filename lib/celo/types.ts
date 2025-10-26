// TypeScript types for CeloSave contract
export interface SavingsGoal {
  id: bigint
  name: string
  targetAmount: bigint
  currentAmount: bigint
  deadline: bigint
  createdAt: bigint
  isActive: boolean
  streak: bigint
  completed?: boolean // Added for Supabase compatibility
  owner?: `0x${string}` // Added for Supabase compatibility
}

export interface CreateGoalParams {
  name: string
  targetAmount: bigint
  deadline: bigint
}

export interface SaveToGoalParams {
  goalId: bigint
  amount: bigint
}

export interface WithdrawParams {
  goalId: bigint
  amount: bigint
}

export interface GoalProgress {
  percentage: number
  remaining: bigint
  daysLeft: number
  isOverdue: boolean
}
