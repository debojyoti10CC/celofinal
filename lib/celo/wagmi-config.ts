"use client"

import { createConfig, http } from "wagmi"
import { celoMainnet, celoAlfajores } from "./config"
import { injected, walletConnect } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id"

const getAppUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return "https://celosave.app"
}

export const wagmiConfig = createConfig({
  chains: [celoAlfajores, celoMainnet],
  connectors: [
    injected({
      target: "metaMask",
    }),
    walletConnect({
      projectId,
      metadata: {
        name: "CeloSave",
        description: "AI-powered savings assistant on Celo",
        url: getAppUrl(),
        icons: [`${getAppUrl()}/icon.png`],
      },
      showQrModal: false, // Disable QR modal to avoid allowlist issues
      qrModalOptions: {
        themeMode: "light",
      },
    }),
  ],
  transports: {
    [celoAlfajores.id]: http(),
    [celoMainnet.id]: http(),
  },
})
