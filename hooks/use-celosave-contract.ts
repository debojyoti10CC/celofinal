"use client"

import { useAccount } from "wagmi"
import { CELOSAVE_CONTRACT_ADDRESS } from "@/lib/celo/config"
import { useBlockchainContract } from "./use-blockchain-contract"
import { useSupabaseGoals } from "./use-supabase-goals"

export function useCeloSaveContract() {
  const { address, chain } = useAccount()

  const contractAddress = chain?.id === 44787 ? CELOSAVE_CONTRACT_ADDRESS.alfajores : CELOSAVE_CONTRACT_ADDRESS.mainnet
  const isContractDeployed = contractAddress !== "0x0000000000000000000000000000000000000000"

  const blockchainContract = useBlockchainContract()
  const supabaseGoals = useSupabaseGoals(address)

  if (!isContractDeployed) {
    return {
      userGoals: supabaseGoals.goals,
      totalSavings: supabaseGoals.goals.reduce((sum, goal) => sum + goal.currentAmount, 0n),
      userStreak: 0n,
      isLoadingGoals: supabaseGoals.isLoading,
      contractAddress,
      isContractDeployed: false,

      createGoal: supabaseGoals.createGoal,
      saveToGoal: supabaseGoals.saveToGoal,
      withdraw: supabaseGoals.withdrawFromGoal,
      deleteGoal: supabaseGoals.deleteGoal,

      refetchGoals: supabaseGoals.refetch,
      refetchTotalSavings: supabaseGoals.refetch,
      refetchStreak: () => {},

      isPending: false,
      isSuccess: false,

      isDemoMode: false,
      isSupabaseMode: true,
      isBlockchainMode: false,
    }
  }

  // Use blockchain when contract is deployed
  return {
    ...blockchainContract,
    isDemoMode: false,
    isSupabaseMode: false,
    isBlockchainMode: true,
  }
}
