export const ESCROW_ABI = [
  {
    inputs: [{ internalType: "address payable", name: "_freelancer", type: "address" }],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidState",
    type: "error",
  },
  {
    inputs: [],
    name: "NotClient",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "client", type: "address" },
      { indexed: true, internalType: "address", name: "freelancer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "EscrowCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "client", type: "address" },
      { indexed: true, internalType: "address", name: "freelancer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "FundsDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "client", type: "address" },
      { indexed: true, internalType: "address", name: "freelancer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "FundsReleased",
    type: "event",
  },
  {
    inputs: [],
    name: "amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cancelEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "client",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentState",
    outputs: [{ internalType: "enum SimpleEscrow.State", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "freelancer",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "releaseFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const
