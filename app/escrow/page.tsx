"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { parseEther, formatEther } from "viem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { ArrowLeft, Shield, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { useEscrow } from "@/hooks/use-escrow"

export default function EscrowPage() {
  const { address, isConnected } = useAccount()
  const [freelancerAddress, setFreelancerAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [escrowAddress, setEscrowAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { createEscrow, releaseFunds, cancelEscrow, getEscrowDetails } = useEscrow()
  const [escrowDetails, setEscrowDetails] = useState<any>(null)

  const handleCreateEscrow = async () => {
    if (!freelancerAddress || !amount) return
    setIsLoading(true)
    try {
      const address = await createEscrow(freelancerAddress as `0x${string}`, parseEther(amount))
      if (address) {
        setEscrowAddress(address)
      }
    } catch (error) {
      console.error("Error creating escrow:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewEscrow = async () => {
    if (!escrowAddress) return
    setIsLoading(true)
    try {
      const details = await getEscrowDetails(escrowAddress as `0x${string}`)
      setEscrowDetails(details)
    } catch (error) {
      console.error("Error fetching escrow:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReleaseFunds = async () => {
    if (!escrowAddress) return
    setIsLoading(true)
    try {
      const success = await releaseFunds(escrowAddress as `0x${string}`)
      if (success) {
        await handleViewEscrow()
      }
    } catch (error) {
      console.error("Error releasing funds:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEscrow = async () => {
    if (!escrowAddress) return
    setIsLoading(true)
    try {
      const success = await cancelEscrow(escrowAddress as `0x${string}`)
      if (success) {
        await handleViewEscrow()
      }
    } catch (error) {
      console.error("Error cancelling escrow:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStateLabel = (state: number) => {
    switch (state) {
      case 0:
        return "Funded"
      case 1:
        return "Completed"
      case 2:
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-black/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-bold text-xl">CeloSave</span>
            </Link>
            <WalletConnectButton />
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="animate-fade-in-up space-y-8">
            {/* Hero section */}
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Freelance Escrow</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Secure blockchain-based escrow for freelance payments on Celo
              </p>
            </div>

            {!isConnected ? (
              <Card className="border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
                <CardContent className="pt-6 text-center space-y-4">
                  <p className="text-gray-600">Connect your wallet to create or manage escrows</p>
                  <WalletConnectButton />
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {/* Create Escrow */}
                <Card className="border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all animate-fade-in-up">
                  <CardHeader>
                    <CardTitle>Create New Escrow</CardTitle>
                    <CardDescription>Deposit funds for a freelance project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="freelancer">Freelancer Address</Label>
                      <Input
                        id="freelancer"
                        placeholder="0x..."
                        value={freelancerAddress}
                        onChange={(e) => setFreelancerAddress(e.target.value)}
                        className="border-2 border-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (CELO)</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border-2 border-black"
                      />
                    </div>
                    <Button
                      onClick={handleCreateEscrow}
                      disabled={!freelancerAddress || !amount || isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Creating..." : "Create Escrow"}
                    </Button>
                  </CardContent>
                </Card>

                {/* View Escrow */}
                <Card className="border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all animate-fade-in-up animation-delay-100">
                  <CardHeader>
                    <CardTitle>View Escrow</CardTitle>
                    <CardDescription>Check escrow status and manage funds</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="escrowAddress">Escrow Contract Address</Label>
                      <Input
                        id="escrowAddress"
                        placeholder="0x..."
                        value={escrowAddress}
                        onChange={(e) => setEscrowAddress(e.target.value)}
                        className="border-2 border-black"
                      />
                    </div>
                    <Button
                      onClick={handleViewEscrow}
                      disabled={!escrowAddress || isLoading}
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      {isLoading ? "Loading..." : "View Details"}
                    </Button>

                    {escrowDetails && (
                      <div className="mt-6 p-4 border-2 border-black bg-gray-50 space-y-3 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Status</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold border-2 border-black ${
                              escrowDetails.state === 0
                                ? "bg-yellow-200"
                                : escrowDetails.state === 1
                                  ? "bg-green-200"
                                  : "bg-red-200"
                            }`}
                          >
                            {getStateLabel(escrowDetails.state)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Client</span>
                          <span className="text-sm font-mono">
                            {escrowDetails.client.slice(0, 6)}...{escrowDetails.client.slice(-4)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Freelancer</span>
                          <span className="text-sm font-mono">
                            {escrowDetails.freelancer.slice(0, 6)}...{escrowDetails.freelancer.slice(-4)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Amount</span>
                          <span className="text-sm font-bold">{formatEther(escrowDetails.amount)} CELO</span>
                        </div>

                        {escrowDetails.state === 0 && escrowDetails.client.toLowerCase() === address?.toLowerCase() && (
                          <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-black">
                            <Button
                              onClick={handleReleaseFunds}
                              disabled={isLoading}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Release
                            </Button>
                            <Button onClick={handleCancelEscrow} disabled={isLoading} variant="destructive">
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
