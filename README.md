# CeloSave - AI-Powered Savings on Celo

A mobile-first, AI-powered savings assistant built for the Celo blockchain ecosystem. CeloSave helps users set and achieve savings goals with personalized recommendations, ultra-low fees, and DeFi yield opportunities.

## Features

### Core Features
- **Wallet Integration**: Connect with MiniPay, MetaMask, Valora, or WalletConnect
- **Savings Goals**: Create, track, and manage multiple savings goals
- **Persistent Storage**: Supabase PostgreSQL database for reliable data storage
- **Progress Tracking**: Visual progress bars, deadlines, and saving streaks
- **AI Assistant**: Conversational AI powered by OpenAI for personalized advice

### Celo Blockchain Benefits
- **Ultra-Low Fees**: Sub-penny transaction costs (< $0.01)
- **Carbon-Negative**: Environmentally friendly blockchain
- **Mobile-First**: Optimized for 10M+ MiniPay users
- **Multi-Currency**: Support for cUSD, cEUR, cREAL stablecoins
- **Fast Transactions**: ~5 second confirmation times

### DeFi Integration
- **Moola Market**: Lending yields (8.2% APY on cUSD)
- **Ubeswap**: Liquidity pool rewards (up to 12.5% APY)
- **Yield Comparison**: Easy comparison of DeFi opportunities
- **Risk Assessment**: Clear risk levels for each opportunity

### AI Capabilities
- Analyze savings behavior and patterns
- Calculate personalized savings recommendations
- Explain Celo blockchain features
- Provide DeFi yield insights
- Celebrate milestones and achievements

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Celo (Alfajores Testnet), Wagmi, Viem
- **Smart Contracts**: Solidity 0.8.20, Hardhat
- **Database**: Supabase (PostgreSQL)
- **AI**: Vercel AI SDK, OpenAI GPT-4o-mini
- **Styling**: Tailwind CSS v4, shadcn/ui
- **State Management**: React Hooks

## Getting Started

### Prerequisites
- Node.js 18+
- A Celo wallet (MiniPay, MetaMask, or Valora)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Supabase account ([Sign up here](https://supabase.com))

### Installation

1. Clone the repository

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables in the **Vars** section of the v0 sidebar:
   
   **Required:**
   - `OPENAI_API_KEY` - Your OpenAI API key for the AI assistant
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Your WalletConnect project ID
   
   **Supabase (Auto-configured if using v0 integration):**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. Set up the database:
   - The SQL migration script in `scripts/001_create_savings_goals_table.sql` will create the necessary tables
   - Run it directly from v0 or execute it in your Supabase SQL editor

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment Modes

CeloSave supports two modes of operation:

### 1. Supabase Mode (Default)
- Data stored in Supabase PostgreSQL database
- No blockchain transactions required
- Perfect for testing and development
- Instant transactions, no gas fees

### 2. Blockchain Mode (Production)
- Real transactions on Celo blockchain
- Smart contract deployed on Alfajores testnet
- Requires testnet CELO for gas fees
- True decentralized savings with on-chain verification

**The app automatically detects which mode to use based on whether a smart contract is deployed.**

## Smart Contract Deployment

To enable real blockchain transactions, deploy the CeloSave smart contract:

### Quick Start

1. **Get Testnet Funds:**
   - Visit [Celo Faucet](https://faucet.celo.org/alfajores)
   - Get testnet CELO for gas fees
   - Swap some CELO for cUSD on [Ubeswap](https://app.ubeswap.org/)

2. **Set Up Deployment:**
   \`\`\`bash
   # Add your wallet private key to .env.local
   PRIVATE_KEY=your_private_key_here
   \`\`\`

3. **Deploy Contract:**
   \`\`\`bash
   npx hardhat run scripts/deploy-contract.js --network alfajores
   \`\`\`

4. **Update Config:**
   Copy the deployed address to `lib/celo/config.ts`:
   \`\`\`typescript
   export const CELOSAVE_CONTRACT_ADDRESS = {
     alfajores: "0xYourDeployedAddress",
   }
   \`\`\`

5. **Restart App:**
   The app will automatically switch to blockchain mode!

📖 **Full deployment guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Database Schema

The app uses Supabase with the following schema:

### `savings_goals` table
- `id` (uuid, primary key)
- `user_address` (text) - Wallet address of the goal owner
- `name` (text) - Goal name
- `target_amount` (numeric) - Target amount in cUSD
- `current_amount` (numeric) - Current saved amount
- `deadline` (bigint) - Unix timestamp deadline
- `created_at` (bigint) - Unix timestamp of creation
- `completed` (boolean) - Whether goal is completed
- `created_at_timestamp` (timestamptz) - Database timestamp

## Environment Variables

### Required Variables

Add these in the **Vars** section of the v0 in-chat sidebar:

1. **OPENAI_API_KEY**
   - Get from: https://platform.openai.com/api-keys
   - Used for: AI assistant chat functionality
   - Example: `sk-proj-...`

2. **NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID**
   - Get from: https://cloud.reown.com
   - Used for: WalletConnect integration
   - Example: `a1b2c3d4e5f6...`

### Supabase Variables (Auto-configured)

If you connect Supabase through v0's integration panel, these are automatically set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Optional: Smart Contract Deployment

For blockchain mode, add to `.env.local`:

\`\`\`env
# Your wallet private key (for deployment only)
PRIVATE_KEY=your_private_key_here

# Optional: CeloScan API key for contract verification
CELOSCAN_API_KEY=your_api_key
\`\`\`

**⚠️ Security:** Never commit `.env.local` to version control!

## Data Storage

CeloSave supports two storage methods:

### Supabase Storage (Default)
- PostgreSQL database
- Instant saves, no gas fees
- Perfect for development and testing
- Data persists across sessions

### Blockchain Storage (When Contract Deployed)
- On-chain smart contract storage
- Real cUSD transactions
- Decentralized and verifiable
- Requires gas fees (~$0.001 per transaction)

The app automatically uses blockchain storage when a contract address is configured.

## How It Works

### Creating a Goal
1. **Supabase Mode:** Goal saved to database instantly
2. **Blockchain Mode:** Transaction sent to smart contract, confirmed in ~5 seconds

### Saving Money
1. **Supabase Mode:** Amount updated in database
2. **Blockchain Mode:** 
   - Approve cUSD spending (first transaction)
   - Save to goal (second transaction)
   - Real cUSD transferred to contract

### Withdrawing
1. **Supabase Mode:** Amount updated in database
2. **Blockchain Mode:** cUSD transferred back to your wallet

## Mobile Optimization

CeloSave is fully optimized for mobile devices:
- Responsive design for all screen sizes
- Touch-friendly UI components
- Mobile-specific quick actions
- Bottom sheet for AI assistant on mobile
- Optimized for slow connections

## DeFi Integration

View real-time DeFi yields from:
- **Moola Market**: Low-risk lending protocol
- **Ubeswap**: DEX with liquidity pools

Each opportunity shows:
- Current APY
- Total Value Locked (TVL)
- Risk level
- Description and benefits

## AI Assistant

The AI assistant uses OpenAI GPT-4o-mini to:
- Access real-time blockchain data
- Analyze user savings patterns
- Provide personalized recommendations
- Explain Celo blockchain features
- Suggest DeFi opportunities

**Tools available to the AI:**
- `getUserGoals` - Fetch user's savings goals
- `calculateSavingsRecommendation` - Calculate daily/weekly/monthly savings needed
- `getCeloDeFiYields` - Get current DeFi yields
- `analyzeSavingsBehavior` - Analyze saving patterns
- `explainCeloFeature` - Explain Celo blockchain features

## Smart Contract Features

When deployed, the CeloSave smart contract provides:

- **Goal Management:** Create, update, and delete savings goals
- **Deposits:** Save cUSD to your goals with automatic tracking
- **Withdrawals:** Withdraw funds anytime (your money, your control)
- **Streak Tracking:** Daily saving streaks for motivation
- **Events:** All actions emit events for transparency
- **Security:** ReentrancyGuard protection, audited patterns

**Contract Address (Alfajores):** Check `lib/celo/config.ts`

## Troubleshooting

### Goals not saving?
- **Supabase Mode:** Check Supabase connection in **Connect** section
- **Blockchain Mode:** Ensure you have testnet CELO for gas fees

### "Contract not deployed" error?
- You're in Supabase mode (this is normal!)
- To use blockchain mode, follow the deployment guide
- Or continue using Supabase mode for testing

### Transaction failed?
- Check you have enough testnet CELO for gas
- Ensure you're on Alfajores network
- Try approving more cUSD than you need to save

### AI assistant not working?
- Ensure `OPENAI_API_KEY` is set in the **Vars** section
- Check that your OpenAI API key is valid and has credits

### Wallet connection issues?
- Make sure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
- Try using MetaMask or another injected wallet instead

## Testing on Testnet

1. **Get Funds:** Use [Celo Faucet](https://faucet.celo.org/alfajores)
2. **Connect Wallet:** Use MetaMask with Alfajores network
3. **Create Goal:** Test goal creation (free in Supabase mode)
4. **Deploy Contract:** Follow deployment guide for blockchain mode
5. **Test Transactions:** Save and withdraw with real testnet cUSD

## Resources

- [Celo Documentation](https://docs.celo.org)
- [Celo Faucet](https://faucet.celo.org/alfajores)
- [CeloScan Testnet](https://alfajores.celoscan.io)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Hardhat Documentation](https://hardhat.org/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Built for the Celo blockchain ecosystem
- Powered by Vercel AI SDK and OpenAI
- Database by Supabase
- Smart contracts with Hardhat
- UI components from shadcn/ui
- Icons from Lucide React

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Open an issue on GitHub
3. Contact the team

---

Built with ❤️ for the Celo community
