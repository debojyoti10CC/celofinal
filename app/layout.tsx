import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CeloProviders } from "@/lib/celo/providers"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CeloSave - AI-Powered Savings on Celo",
  description: "Mobile-first savings assistant built for the Celo blockchain",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CeloProviders>
          {children}
          <Toaster />
        </CeloProviders>
      </body>
    </html>
  )
}
