"use client"

import { useAccount, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { TrendingUp, LogOut } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">CeloSave</h1>
          </Link>

          <div className="flex items-center gap-4">
            {address && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={() => disconnect()}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Disconnect</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
