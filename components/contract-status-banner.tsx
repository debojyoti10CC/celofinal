"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ContractStatusBannerProps {
  isContractDeployed: boolean
  isSupabaseMode: boolean
}

export function ContractStatusBanner({ isContractDeployed, isSupabaseMode }: ContractStatusBannerProps) {
  if (isContractDeployed) return null

  return (
    <Alert className="border-4 border-black bg-white mb-6">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="text-lg font-black uppercase">Contract Not Deployed</AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p className="font-bold">
          You're currently using Supabase storage. To use real blockchain transactions on Celo Alfajores testnet:
        </p>
        <ol className="list-decimal list-inside space-y-2 font-mono text-sm">
          <li>Get testnet CELO from the faucet</li>
          <li>Deploy the CeloSave smart contract</li>
          <li>Update the contract address in config.ts</li>
        </ol>
        <div className="flex gap-3 mt-4">
          <Button asChild variant="default" size="sm" className="font-black">
            <Link href="https://faucet.celo.org/alfajores" target="_blank" rel="noopener noreferrer">
              Get Testnet CELO
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="font-black bg-transparent">
            <Link href="/BLOCKCHAIN_SETUP.md" target="_blank">
              View Setup Guide
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
