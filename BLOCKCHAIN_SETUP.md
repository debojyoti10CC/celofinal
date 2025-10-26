# CeloSave Blockchain Setup Guide

This guide will help you deploy the CeloSave smart contract to Celo Alfajores testnet and configure the app for real blockchain transactions.

## Prerequisites

1. **Get Testnet CELO and cUSD**
   - Visit the [Celo Alfajores Faucet](https://faucet.celo.org/alfajores)
   - Connect your wallet (MetaMask, Valora, or MiniPay)
   - Request testnet CELO (for gas fees)
   - Request testnet cUSD (for savings)

2. **Set up your private key**
   - Export your wallet's private key
   - Add it to your `.env.local` file:
     \`\`\`
     PRIVATE_KEY=your_private_key_here
     \`\`\`
   - ⚠️ **NEVER commit your private key to git!**

## Deployment Steps

### 1. Install Dependencies

\`\`\`bash
bun install
\`\`\`

### 2. Deploy the Contract

\`\`\`bash
npx hardhat run scripts/deploy-celosave.js --network alfajores
\`\`\`

This will:
- Deploy the CeloSave contract to Alfajores testnet
- Output the deployed contract address
- Provide verification instructions

### 3. Update Configuration

Copy the deployed contract address and update `lib/celo/config.ts`:

\`\`\`typescript
export const CELOSAVE_CONTRACT_ADDRESS = {
  mainnet: "0x0000000000000000000000000000000000000000",
  alfajores: "0xYOUR_DEPLOYED_CONTRACT_ADDRESS_HERE", // <-- Paste here
} as const
\`\`\`

### 4. Verify Contract (Optional but Recommended)

\`\`\`bash
npx hardhat verify --network alfajores YOUR_CONTRACT_ADDRESS 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1
\`\`\`

This makes your contract code visible on CeloScan.

## Using the App

Once deployed:

1. **Connect Wallet**: Click "Connect Wallet" and select your wallet
2. **Create a Goal**: Set a savings goal with target amount and deadline
3. **Save to Goal**: Approve cUSD spending and save funds (requires 2 transactions)
4. **Withdraw**: Withdraw funds from your goals when needed
5. **Delete Goal**: Remove goals you no longer need

## Transaction Costs

- **Gas fees**: Paid in CELO (very low, usually < $0.01)
- **Savings**: Stored in cUSD (stablecoin pegged to USD)

## Troubleshooting

### "Insufficient funds" error
- Make sure you have testnet CELO for gas fees
- Get more from the [faucet](https://faucet.celo.org/alfajores)

### "Insufficient cUSD balance" error
- Request testnet cUSD from the faucet
- Check your balance in the dashboard

### Transaction stuck
- Check the transaction on [Alfajores CeloScan](https://alfajores.celoscan.io)
- Wait a few minutes for confirmation
- Try increasing gas price if needed

## Contract Functions

The CeloSave contract supports:

- `createSavingsGoal(name, targetAmount, deadline)` - Create a new savings goal
- `saveToGoal(goalId, amount)` - Add funds to a goal
- `withdraw(goalId, amount)` - Withdraw funds from a goal
- `getUserGoals(address)` - Get all goals for a user
- `getTotalSavings(address)` - Get total savings across all goals
- `getUserStreak(address)` - Get user's savings streak

## Security Notes

- ✅ Contract uses OpenZeppelin's secure libraries
- ✅ All funds are stored on-chain
- ✅ Only goal owners can withdraw their funds
- ✅ cUSD approval required before saving (prevents unauthorized transfers)
- ⚠️ This is testnet - do not use real funds
- ⚠️ Always verify contract addresses before interacting

## Next Steps

After successful deployment:
1. Test creating a goal
2. Test saving small amounts (e.g., 0.1 cUSD)
3. Test withdrawing funds
4. Monitor transactions on CeloScan
5. When ready, deploy to mainnet (update config and deploy script)

## Support

- [Celo Documentation](https://docs.celo.org)
- [Celo Discord](https://discord.gg/celo)
- [CeloScan](https://alfajores.celoscan.io)
