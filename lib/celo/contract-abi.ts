// CeloSave Smart Contract ABI
export const CELOSAVE_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "uint256", name: "_targetAmount", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "createSavingsGoal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_goalId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "saveToGoal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserGoals",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "targetAmount", type: "uint256" },
          { internalType: "uint256", name: "currentAmount", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" },
          { internalType: "uint256", name: "streak", type: "uint256" },
        ],
        internalType: "struct CeloSave.SavingsGoal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_goalId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getTotalSavings",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserStreak",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_goalId", type: "uint256" }],
    name: "deleteGoal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "goalId", type: "uint256" },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: false, internalType: "uint256", name: "targetAmount", type: "uint256" },
    ],
    name: "GoalCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "goalId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "SavedToGoal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "goalId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "Withdrawn",
    type: "event",
  },
] as const

// ERC20 ABI for cUSD token interactions
export const ERC20_ABI = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const
