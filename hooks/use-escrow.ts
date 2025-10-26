"use client"

import { usePublicClient, useWalletClient } from "wagmi"
import { getContract } from "viem"
import { ESCROW_ABI } from "@/lib/escrow/escrow-abi"
import { toast } from "sonner"

export function useEscrow() {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const createEscrow = async (freelancerAddress: `0x${string}`, amount: bigint) => {
    if (!walletClient) {
      toast.error("Please connect your wallet")
      return null
    }

    try {
      // Deploy the escrow contract
      const hash = await walletClient.deployContract({
        abi: ESCROW_ABI,
        bytecode: "0x" as `0x${string}`, // Note: You'll need to add the actual bytecode
        args: [freelancerAddress],
        value: amount,
      })

      const receipt = await publicClient?.waitForTransactionReceipt({ hash })

      if (receipt?.contractAddress) {
        toast.success("Escrow created successfully!")
        return receipt.contractAddress
      }
      return null
    } catch (error: any) {
      console.error("Error creating escrow:", error)
      toast.error(error.message || "Failed to create escrow")
      return null
    }
  }

  const getEscrowDetails = async (escrowAddress: `0x${string}`) => {
    if (!publicClient) return null

    try {
      const contract = getContract({
        address: escrowAddress,
        abi: ESCROW_ABI,
        client: publicClient,
      })

      const [client, freelancer, amount, state] = await Promise.all([
        contract.read.client(),
        contract.read.freelancer(),
        contract.read.amount(),
        contract.read.currentState(),
      ])

      return { client, freelancer, amount, state }
    } catch (error) {
      console.error("Error fetching escrow details:", error)
      toast.error("Failed to fetch escrow details")
      return null
    }
  }

  const releaseFunds = async (escrowAddress: `0x${string}`) => {
    if (!walletClient) {
      toast.error("Please connect your wallet")
      return false
    }

    try {
      const hash = await walletClient.writeContract({
        address: escrowAddress,
        abi: ESCROW_ABI,
        functionName: "releaseFunds",
      })

      await publicClient?.waitForTransactionReceipt({ hash })
      toast.success("Funds released successfully!")
      return true
    } catch (error: any) {
      console.error("Error releasing funds:", error)
      toast.error(error.message || "Failed to release funds")
      return false
    }
  }

  const cancelEscrow = async (escrowAddress: `0x${string}`) => {
    if (!walletClient) {
      toast.error("Please connect your wallet")
      return false
    }

    try {
      const hash = await walletClient.writeContract({
        address: escrowAddress,
        abi: ESCROW_ABI,
        functionName: "cancelEscrow",
      })

      await publicClient?.waitForTransactionReceipt({ hash })
      toast.success("Escrow cancelled successfully!")
      return true
    } catch (error: any) {
      console.error("Error cancelling escrow:", error)
      toast.error(error.message || "Failed to cancel escrow")
      return false
    }
  }

  return {
    createEscrow,
    getEscrowDetails,
    releaseFunds,
    cancelEscrow,
  }
}
