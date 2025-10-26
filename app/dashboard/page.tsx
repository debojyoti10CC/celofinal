"use client"

import { useAccount } from "wagmi"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCeloSaveContract } from "@/hooks/use-celosave-contract"
import { CreateGoalDialog } from "@/components/create-goal-dialog"
import { GoalCard } from "@/components/goal-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { DeFiYieldsCard } from "@/components/defi-yields-card"
import { ContractStatusBanner } from "@/components/contract-status-banner"
import { Target, TrendingUp, Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const { userGoals, totalSavings, userStreak, isLoadingGoals, isContractDeployed, isSupabaseMode } =
    useCeloSaveContract()

  if (!isConnected) {
    redirect("/")
  }

  const activeGoals = userGoals.filter((goal) => !goal.completed)
  const completedGoals = userGoals.filter((goal) => goal.completed)

  return (
    <main className="relative min-h-screen bg-background pb-8">
      <DashboardHeader />

      <div className="container mx-auto px-3 lg:px-4 py-4 lg:py-8 max-w-7xl">
        <ContractStatusBanner isContractDeployed={isContractDeployed} isSupabaseMode={isSupabaseMode} />

        <DashboardStats totalSavings={totalSavings} userStreak={userStreak} goalsCount={activeGoals.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-8">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3 lg:mb-6 gap-2">
                <h2 className="text-lg lg:text-2xl font-bold text-foreground break-words">Your Savings Goals</h2>
                <CreateGoalDialog>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 h-9 lg:h-10">
                    <Plus className="h-4 w-4 lg:mr-2" />
                    <span className="hidden sm:inline text-sm">New Goal</span>
                  </Button>
                </CreateGoalDialog>
              </div>

              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 h-9 lg:h-10">
                  <TabsTrigger value="active" className="text-xs lg:text-sm">
                    Active ({activeGoals.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs lg:text-sm">
                    Completed ({completedGoals.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-3 lg:mt-6">
                  {isLoadingGoals ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
                      {[1, 2].map((i) => (
                        <Card key={i} className="p-4 lg:p-6">
                          <Skeleton className="h-6 w-3/4 mb-4" />
                          <Skeleton className="h-4 w-1/2 mb-6" />
                          <Skeleton className="h-2 w-full mb-4" />
                          <Skeleton className="h-10 w-full" />
                        </Card>
                      ))}
                    </div>
                  ) : activeGoals.length === 0 ? (
                    <Card className="p-6 lg:p-12 text-center">
                      <Target className="h-8 w-8 lg:h-12 lg:w-12 text-muted-foreground mx-auto mb-3 lg:mb-4" />
                      <h3 className="text-sm lg:text-lg font-semibold text-foreground mb-2 break-words">
                        No active goals yet
                      </h3>
                      <p className="text-xs lg:text-sm text-muted-foreground mb-4 lg:mb-6 break-words">
                        Create your first savings goal to get started!
                      </p>
                      <CreateGoalDialog>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Goal
                        </Button>
                      </CreateGoalDialog>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
                      {activeGoals.map((goal) => (
                        <GoalCard key={goal.id.toString()} goal={goal} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="mt-3 lg:mt-6">
                  {completedGoals.length === 0 ? (
                    <Card className="p-6 lg:p-12 text-center">
                      <TrendingUp className="h-8 w-8 lg:h-12 lg:w-12 text-muted-foreground mx-auto mb-3 lg:mb-4" />
                      <h3 className="text-sm lg:text-lg font-semibold text-foreground mb-2 break-words">
                        No completed goals yet
                      </h3>
                      <p className="text-xs lg:text-sm text-muted-foreground break-words">
                        Keep saving to reach your goals!
                      </p>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
                      {completedGoals.map((goal) => (
                        <GoalCard key={goal.id.toString()} goal={goal} isCompleted />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:hidden">
              <DeFiYieldsCard />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <DeFiYieldsCard />
          </div>
        </div>
      </div>
    </main>
  )
}
