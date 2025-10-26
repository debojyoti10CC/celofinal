"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ExternalLink, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface YieldOpportunity {
  protocol: string
  asset: string
  apy: string
  tvl: string
  riskLevel: "Low" | "Medium" | "High"
  description: string
  url: string
}

const YIELD_OPPORTUNITIES: YieldOpportunity[] = [
  {
    protocol: "Moola Market",
    asset: "cUSD",
    apy: "8.2%",
    tvl: "$12.5M",
    riskLevel: "Low",
    description: "Lend cUSD to earn interest. Low risk, stable returns.",
    url: "https://moola.market",
  },
  {
    protocol: "Moola Market",
    asset: "cEUR",
    apy: "7.5%",
    tvl: "$8.3M",
    riskLevel: "Low",
    description: "Lend cEUR to earn interest. Low risk, stable returns.",
    url: "https://moola.market",
  },
  {
    protocol: "Ubeswap",
    asset: "cUSD-CELO LP",
    apy: "12.5%",
    tvl: "$18.2M",
    riskLevel: "Medium",
    description: "Provide liquidity to earn trading fees and rewards.",
    url: "https://ubeswap.org",
  },
  {
    protocol: "Ubeswap",
    asset: "cUSD-cEUR LP",
    apy: "9.8%",
    tvl: "$6.7M",
    riskLevel: "Medium",
    description: "Stable pair liquidity with lower impermanent loss risk.",
    url: "https://ubeswap.org",
  },
]

const riskColors = {
  Low: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  High: "bg-destructive/10 text-destructive border-destructive/20",
}

export function DeFiYieldsCard() {
  return (
    <Card className="p-4 lg:p-6">
      <div className="flex items-start justify-between mb-4 lg:mb-6 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg lg:text-xl font-bold text-foreground flex items-center gap-2 flex-wrap">
            <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-primary shrink-0" />
            <span className="break-words">DeFi Yields on Celo</span>
          </h3>
          <p className="text-xs lg:text-sm text-muted-foreground mt-1 break-words">
            Grow your savings with DeFi opportunities
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <Info className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">
                DeFi yields allow you to earn passive income on your savings. Start with low-risk options like Moola
                lending.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {YIELD_OPPORTUNITIES.map((opportunity, index) => (
          <Card key={index} className="p-3 lg:p-4 hover:shadow-md transition-shadow bg-card/50">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h4 className="font-semibold text-sm lg:text-base text-foreground break-words">
                    {opportunity.protocol}
                  </h4>
                  <Badge variant="outline" className={`${riskColors[opportunity.riskLevel]} text-xs shrink-0`}>
                    {opportunity.riskLevel} Risk
                  </Badge>
                </div>
                <p className="text-xs lg:text-sm text-muted-foreground mb-2 break-words">{opportunity.asset}</p>
                <p className="text-xs text-muted-foreground break-words leading-relaxed">{opportunity.description}</p>
                <div className="flex items-center gap-4 mt-2 lg:mt-3 text-xs text-muted-foreground">
                  <span className="break-words">TVL: {opportunity.tvl}</span>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 w-full sm:w-auto shrink-0">
                <div className="text-xl lg:text-2xl font-bold text-primary">{opportunity.apy}</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-transparent text-xs shrink-0"
                  onClick={() => window.open(opportunity.url, "_blank")}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 lg:mt-6 p-3 lg:p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground break-words leading-relaxed">
          <strong className="text-foreground">Note:</strong> DeFi investments carry risks. Start small and only invest
          what you can afford to lose. Moola lending is recommended for beginners due to lower risk.
        </p>
      </div>
    </Card>
  )
}
