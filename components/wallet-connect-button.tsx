"use client"

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wallet, LogOut, Loader2, ArrowRight } from "lucide-react"
import { CUSD_ADDRESS } from "@/lib/celo/config"
import { formatUnits } from "viem"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function WalletConnectButton() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  // Get cUSD balance
  const { data: cUSDBalance } = useBalance({
    address,
    token: chain?.id === 44787 ? CUSD_ADDRESS.alfajores : CUSD_ADDRESS.mainnet,
  })

  // Get CELO balance
  const { data: celoBalance } = useBalance({
    address,
  })

  const handleConnect = async (connector: any) => {
    try {
      await connect({ connector })
    } catch (err: any) {
      console.error("[v0] Wallet connection error:", err)

      // Handle specific WalletConnect allowlist errors
      if (err?.message?.includes("Allowlist") || err?.message?.includes("not found")) {
        toast.error("WalletConnect Error", {
          description: "Please use MetaMask or an injected wallet instead. WalletConnect requires domain allowlisting.",
        })
      } else {
        toast.error("Connection Failed", {
          description: err?.message || "Failed to connect wallet. Please try again.",
        })
      }
    }
  }

  if (isConnected && address) {
    return (
      <Card className="p-4 bg-card">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Connected</p>
            <p className="text-xs text-muted-foreground truncate">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <div className="mt-2 space-y-1">
              {cUSDBalance && (
                <p className="text-sm font-semibold text-primary">
                  {Number.parseFloat(formatUnits(cUSDBalance.value, 18)).toFixed(2)} cUSD
                </p>
              )}
              {celoBalance && (
                <p className="text-xs text-muted-foreground">
                  {Number.parseFloat(formatUnits(celoBalance.value, 18)).toFixed(4)} CELO
                </p>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => disconnect()} className="shrink-0">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Go to Dashboard
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Card>
    )
  }

  const isPreviewEnv = typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")
  const availableConnectors = isPreviewEnv ? connectors.filter((c) => c.id !== "walletConnect") : connectors

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground text-center">Connect your wallet to start saving</p>
      {availableConnectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => handleConnect(connector)}
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Wallet className="h-5 w-5 mr-2" />
              Connect {connector.name}
            </>
          )}
        </Button>
      ))}
      {isPreviewEnv ? (
        <p className="text-xs text-muted-foreground text-center">Preview mode: Use MetaMask or MiniPay to connect</p>
      ) : (
        <p className="text-xs text-muted-foreground text-center">Supports MiniPay, MetaMask, Valora & WalletConnect</p>
      )}
      {error && <p className="text-xs text-destructive text-center">{error.message}</p>}
    </div>
  )
}
