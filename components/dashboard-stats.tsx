"use client"

import { Card } from "@/components/ui/card"
import { formatCUSD } from "@/lib/celo/contract-utils"
import { TrendingUp, Target, Flame } from "lucide-react"

interface DashboardStatsProps {
  totalSavings: bigint
  userStreak: bigint
  goalsCount: number
}

export function DashboardStats({ totalSavings, userStreak, goalsCount }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <Card className="group relative overflow-hidden p-6 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Total Savings</p>
            </div>
            <div className="mt-3">
              <p className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                {formatCUSD(totalSavings)}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">cUSD</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </Card>

      <Card className="group relative overflow-hidden p-6 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
            </div>
            <div className="mt-3">
              <p className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{goalsCount}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                {goalsCount === 1 ? "goal" : "goals"} in progress
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </Card>

      <Card className="group relative overflow-hidden p-6 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400 group-hover:animate-pulse" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Saving Streak</p>
            </div>
            <div className="mt-3">
              <p className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{userStreak.toString()}</p>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mt-1">
                {userStreak.toString() === "1" ? "day" : "days"} strong
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </Card>
    </div>
  )
}
