import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Smartphone, TrendingUp, Users, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-background" />
              </div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">CeloSave</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/escrow">
                <Button variant="ghost" className="gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Escrow</span>
                </Button>
              </Link>
              <div className="text-xs font-mono text-muted-foreground px-3 py-1 border border-border rounded-full">
                Alfajores Testnet
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight animate-fade-in">
            Save Smarter with
            <br />
            <span className="inline-block mt-2">AI on Celo</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-100">
            Your mobile-first savings assistant powered by blockchain technology. Ultra-low fees, carbon-negative, and
            built for everyone.
          </p>

          <div className="max-w-md mx-auto pt-6 animate-fade-in animate-delay-200">
            <WalletConnectButton />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 card-hover border-2 animate-scale-in">
            <div className="h-14 w-14 rounded-xl bg-foreground flex items-center justify-center mb-6">
              <Smartphone className="h-7 w-7 text-background" />
            </div>
            <h3 className="font-bold text-foreground mb-3 text-lg">Mobile-First</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Optimized for MiniPay with 10M+ users. Save on the go.
            </p>
          </Card>

          <Card className="p-6 card-hover border-2 animate-scale-in animate-delay-100">
            <div className="h-14 w-14 rounded-xl bg-foreground flex items-center justify-center mb-6">
              <TrendingUp className="h-7 w-7 text-background" />
            </div>
            <h3 className="font-bold text-foreground mb-3 text-lg">Ultra-Low Fees</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sub-penny transaction costs. Save more, spend less on fees.
            </p>
          </Card>

          <Card className="p-6 card-hover border-2 animate-scale-in animate-delay-200">
            <div className="h-14 w-14 rounded-xl bg-foreground flex items-center justify-center mb-6">
              <Leaf className="h-7 w-7 text-background" />
            </div>
            <h3 className="font-bold text-foreground mb-3 text-lg">Carbon Negative</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Save money while saving the planet on Celo's green blockchain.
            </p>
          </Card>

          <Card className="p-6 card-hover border-2 animate-scale-in animate-delay-300">
            <div className="h-14 w-14 rounded-xl bg-foreground flex items-center justify-center mb-6">
              <Users className="h-7 w-7 text-background" />
            </div>
            <h3 className="font-bold text-foreground mb-3 text-lg">Cross-Border</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Share savings goals with family and friends worldwide.
            </p>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 border-2 card-hover animate-fade-in bg-gradient-to-br from-background to-muted/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-2xl bg-foreground flex items-center justify-center">
                <Shield className="h-10 w-10 text-background" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Freelance Escrow</h3>
              <p className="text-muted-foreground leading-relaxed">
                Secure blockchain-based escrow for freelance payments. Protect both clients and freelancers with smart
                contract automation.
              </p>
            </div>
            <Link href="/escrow">
              <Button size="lg" className="gap-2 group">
                Try Escrow
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 mb-16 relative z-10">
        <Card className="max-w-4xl mx-auto p-12 border-2 card-hover animate-fade-in">
          <div className="text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Ready to Start Saving?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              Connect your wallet to access your personalized AI savings assistant, create goals, and start building
              your financial future on Celo.
            </p>
          </div>
        </Card>
      </section>
    </main>
  )
}
