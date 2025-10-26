# CeloSave Setup Guide

This guide will help you set up CeloSave for development and production.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A Celo wallet (MiniPay, MetaMask, or Valora)
- OpenAI API key
- WalletConnect Project ID (optional, for WalletConnect support)

## Step 1: Install Dependencies

\`\`\`bash
npm install
\`\`\`

## Step 2: Configure Environment Variables

### Required Environment Variables

1. **OpenAI API Key** (Required for AI Assistant)
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add to your environment:
   \`\`\`
   OPENAI_API_KEY=sk-...
   \`\`\`

2. **WalletConnect Project ID** (Optional)
   - Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Create a new project
   - Copy your Project ID
   - Add to your environment:
   \`\`\`
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
   \`\`\`

### Supabase Configuration (Automatic in v0)

If you're using v0, Supabase is automatically configured. The following environment variables are set for you:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

If you're running locally, you'll need to set these up manually:

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API
4. Copy the URL and anon key
5. Add to your `.env.local`:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   \`\`\`

## Step 3: Set Up Database

The app uses Supabase for storing savings goals. Run the SQL migration script:

1. In v0, the script will run automatically from the `scripts` folder
2. Or manually run `scripts/001_create_savings_goals_table.sql` in your Supabase SQL editor

This creates the `savings_goals` table with proper Row Level Security policies.

## Step 4: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Connect Your Wallet

1. Click "Connect Wallet" on the homepage
2. Choose your wallet (MetaMask, MiniPay, etc.)
3. Approve the connection
4. You'll be redirected to the dashboard

## Step 6: Get Testnet Tokens

To test the app, you'll need testnet CELO and cUSD:

1. Go to [Celo Faucet](https://faucet.celo.org)
2. Select "Alfajores Testnet"
3. Enter your wallet address
4. Request tokens

## Features Overview

### Creating Savings Goals

1. Click "New Goal" on the dashboard
2. Enter goal name, target amount (in cUSD), and deadline
3. Click "Create Goal"
4. Your goal is saved to Supabase

### Saving to Goals

1. Click "Save" on any goal card
2. Enter the amount you want to save
3. Confirm the transaction
4. Your progress updates automatically

### AI Assistant

The AI assistant can help you:
- Analyze your savings behavior
- Calculate personalized recommendations
- Explain Celo blockchain features
- Suggest DeFi yield opportunities

Try asking:
- "How am I doing with my savings?"
- "What's the best way to reach my goal?"
- "Tell me about Celo's low fees"
- "What DeFi yields are available?"

### DeFi Integration

View current yields from:
- **Moola Market**: Low-risk lending (8.2% APY on cUSD)
- **Ubeswap**: Liquidity pools (up to 12.5% APY)

## Troubleshooting

### "User rejected the request" Error

This means the smart contract isn't deployed yet. The app automatically uses Supabase for data storage instead.

### WalletConnect Allowlist Error

If you see an allowlist error, WalletConnect is disabled in preview environments. Use MetaMask or an injected wallet instead.

### AI Assistant Not Working

Make sure you've set the `OPENAI_API_KEY` environment variable. Without it, the AI assistant won't function.

### Goals Not Saving

1. Check that Supabase is connected in the v0 sidebar
2. Verify the database migration script has run
3. Check browser console for errors

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - Supabase variables (if not using v0)
4. Deploy!

### Smart Contract Deployment (Optional)

To use the actual smart contract instead of Supabase:

1. Deploy the CeloSave contract to Celo Alfajores
2. Update `lib/celo/config.ts` with the contract address
3. The app will automatically use the contract

## Support

For issues or questions:
- Check the [README.md](./README.md)
- Open an issue on GitHub
- Contact the team

## Next Steps

- Create your first savings goal
- Chat with the AI assistant
- Explore DeFi yield opportunities
- Invite friends to save together!

---

Happy saving with CeloSave! 🌱💰
