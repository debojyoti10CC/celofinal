# CeloSave Smart Contract Deployment Guide

This guide will help you deploy the CeloSave smart contract to Celo Alfajores testnet and integrate it with your app.

## Prerequisites

1. **MetaMask Wallet** with Celo Alfajores network added
2. **Testnet CELO** for gas fees
3. **Testnet cUSD** for testing savings

## Step 1: Get Testnet Funds

### Get Testnet CELO (for gas fees)
1. Visit the Celo Faucet: https://faucet.celo.org/alfajores
2. Enter your wallet address
3. Click "Get Testnet CELO"
4. Wait for the transaction to complete (~5 seconds)

### Get Testnet cUSD (for savings)
1. Go to Ubeswap Testnet: https://app.ubeswap.org/
2. Connect your wallet
3. Swap some testnet CELO for cUSD
4. Or use the Mento Exchange: https://app.mento.org/

## Step 2: Set Up Deployment Environment

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Create Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
# Your wallet private key (NEVER commit this!)
PRIVATE_KEY=your_private_key_here

# Optional: CeloScan API key for contract verification
CELOSCAN_API_KEY=your_celoscan_api_key
\`\`\`

**⚠️ SECURITY WARNING:** Never commit your private key to git! Add `.env.local` to `.gitignore`.

### Export Your Private Key from MetaMask
1. Open MetaMask
2. Click the three dots menu
3. Select "Account Details"
4. Click "Export Private Key"
5. Enter your password
6. Copy the private key and paste it in `.env.local`

## Step 3: Deploy the Contract

### Deploy to Alfajores Testnet
\`\`\`bash
npx hardhat run scripts/deploy-contract.js --network alfajores
\`\`\`

You should see output like:
\`\`\`
Deploying CeloSave contract to Celo Alfajores...
✅ CeloSave deployed to: 0x1234567890abcdef1234567890abcdef12345678

📝 Update your lib/celo/config.ts with this address:
alfajores: "0x1234567890abcdef1234567890abcdef12345678",

🔍 Verify on CeloScan:
https://alfajores.celoscan.io/address/0x1234567890abcdef1234567890abcdef12345678
\`\`\`

## Step 4: Update Contract Address

Copy the deployed contract address and update `lib/celo/config.ts`:

\`\`\`typescript
export const CELOSAVE_CONTRACT_ADDRESS = {
  mainnet: "0x0000000000000000000000000000000000000000",
  alfajores: "0x1234567890abcdef1234567890abcdef12345678", // ← Your deployed address
} as const
\`\`\`

## Step 5: Test the Integration

1. **Restart your development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Connect your wallet** to the app

3. **Create a savings goal:**
   - Click "Create Goal"
   - Enter goal details
   - Confirm the transaction in MetaMask

4. **Save to your goal:**
   - Click "Save" on a goal
   - Enter amount
   - Approve cUSD spending (first transaction)
   - Confirm save transaction (second transaction)

5. **Check on CeloScan:**
   - Visit your contract on CeloScan
   - View transactions and events
   - Verify goal creation and savings

## Troubleshooting

### "Insufficient funds for gas"
- Get more testnet CELO from the faucet
- Make sure you're on Alfajores network

### "User rejected transaction"
- Check MetaMask is unlocked
- Ensure you're on the correct network
- Try increasing gas limit

### "Contract not deployed"
- Verify the contract address in `config.ts`
- Check the deployment was successful
- Ensure you're on Alfajores network

### "Approval failed"
- Make sure you have enough cUSD
- Check cUSD contract address is correct
- Try approving a larger amount

## Contract Verification (Optional)

To verify your contract on CeloScan:

\`\`\`bash
npx hardhat verify --network alfajores YOUR_CONTRACT_ADDRESS "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
\`\`\`

## Next Steps

- Test all features (create, save, withdraw, delete)
- Monitor transactions on CeloScan
- Share your deployed contract address
- Deploy to mainnet when ready (use real CELO/cUSD!)

## Resources

- Celo Docs: https://docs.celo.org
- Celo Faucet: https://faucet.celo.org/alfajores
- CeloScan Testnet: https://alfajores.celoscan.io
- Hardhat Docs: https://hardhat.org/docs
