export interface SavingsGoalRow {
  id: string
  user_address: string
  name: string
  target_amount: string // numeric stored as string
  current_amount: string // numeric stored as string
  deadline: string // bigint stored as string
  created_at: string // bigint stored as string
  completed: boolean
  created_at_timestamp: string
}
