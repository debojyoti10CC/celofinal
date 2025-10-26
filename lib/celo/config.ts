import type { Chain } from "viem"

export const celoMainnet: Chain = {
  id: 42220,
  name: "Celo Mainnet",
  network: "celo",
  nativeCurrency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://forno.celo.org"],
    },
    public: {
      http: ["https://forno.celo.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "CeloScan",
      url: "https://celoscan.io",
    },
  },
  testnet: false,
}

export const celoAlfajores: Chain = {
  id: 44787,
  name: "Celo Alfajores Testnet",
  network: "celo-alfajores",
  nativeCurrency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://alfajores-forno.celo-testnet.org"],
    },
    public: {
      http: ["https://alfajores-forno.celo-testnet.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "CeloScan",
      url: "https://alfajores.celoscan.io",
    },
  },
  testnet: true,
}

// cUSD token addresses
export const CUSD_ADDRESS = {
  mainnet: "0x765DE816845861e75A25fCC122bb6898B8B1282a",
  alfajores: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
} as const

// CeloSave contract addresses
export const CELOSAVE_CONTRACT_ADDRESS = {
  mainnet: "0x0000000000000000000000000000000000000000", // TODO: Deploy to mainnet
  alfajores: "0x0000000000000000000000000000000000000000", // TODO: Deploy to testnet - UPDATE THIS AFTER DEPLOYMENT
} as const

export const DEFAULT_CHAIN = celoAlfajores
