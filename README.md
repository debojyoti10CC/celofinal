# CeloSave: AI-Powered Savings Assistant on Celo

## Overview

CeloSave is a mobile-first savings application developed for the Celo blockchain ecosystem. It leverages Artificial Intelligence to provide users with personalized financial guidance, helping them establish and achieve savings goals effectively. The application integrates seamlessly with the Celo network, offering features such as ultra-low transaction fees, carbon-negative operations, and access to decentralized finance (DeFi) yield opportunities.

## Key Features

* **Wallet Integration**: Supports connection via MiniPay, MetaMask, Valora, and WalletConnect.
* **Savings Goal Management**: Enables users to create, monitor, and manage multiple savings objectives.
* **Dual Storage Options**: Offers flexibility with data storage either via Supabase (PostgreSQL) or directly on the Celo blockchain using the `CeloSave` smart contract.
* **Progress Visualization**: Includes visual progress bars, deadline tracking, and savings streak monitoring.
* **AI Financial Assistant**: Integrates OpenAI's GPT models via the Vercel AI SDK to provide personalized savings advice and insights.
* **DeFi Yield Integration**: Provides visibility into potential yield opportunities from Celo DeFi protocols like Moola Market and Ubeswap.
* **Freelance Escrow Feature**: Includes a secure, smart contract-based escrow system for freelance payments on Celo.

## Technical Stack

* **Frontend**: Next.js 15, React 19, TypeScript
* **Blockchain Interaction**: Wagmi, Viem
* **Smart Contracts**: Solidity 0.8.20, Hardhat
* **Database**: Supabase (PostgreSQL)
* **AI Integration**: Vercel AI SDK, OpenAI GPT-4o-mini
* **UI & Styling**: Tailwind CSS v4, shadcn/ui, Lucide React Icons

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or compatible package manager (e.g., yarn, pnpm)
* A Celo-compatible wallet (e.g., MiniPay, MetaMask configured for Celo, Valora)
* OpenAI API Key
* Supabase Account and Project Credentials
* WalletConnect Project ID

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd celosave
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the project root and add the following required variables:
    ```env
    # Required for AI Assistant
    OPENAI_API_KEY=sk-...

    # Required for WalletConnect
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...

    # Required for Supabase integration
    NEXT_PUBLIC_SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key # If needed

    # Optional: For smart contract deployment (keep out of version control)
    PRIVATE_KEY=your_wallet_private_key
    CELOSCAN_API_KEY=your_celoscan_api_key
    ```
    *(Refer to `SETUP.md` for details on obtaining these keys)*

4.  **Database Setup (Supabase Mode):**
    Execute the SQL script located at `scripts/001_create_savings_goals_table.sql` within your Supabase project's SQL editor to create the `savings_goals` table and configure Row Level Security (RLS) policies.

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Access the application at `http://localhost:3000`.

## Operating Modes

CeloSave can operate in two distinct modes:

1.  **Supabase Mode (Default):** Utilizes Supabase for data persistence. Goal creation, updates, and deletions are handled via API calls to Supabase. This mode requires no blockchain interactions for core savings goal management and incurs no gas fees. Ideal for rapid development and testing.
2.  **Blockchain Mode:** Interacts directly with the deployed `CeloSave` smart contract on the Celo network (e.g., Alfajores testnet). All savings operations (create, save, withdraw, delete) are executed as blockchain transactions, requiring gas fees (paid in CELO) and involving real cUSD transfers (on testnet). This mode offers decentralized data storage and verification.

The application automatically selects the mode based on the presence of a valid contract address in `lib/celo/config.ts`. If the address is the zero address (`0x0...0`), Supabase mode is used.

## Smart Contract Deployment (Blockchain Mode)

To enable Blockchain Mode, deploy the `CeloSave.sol` contract:

1.  **Obtain Testnet Funds:** Secure testnet CELO (for gas) and cUSD (for testing) from the [Celo Alfajores Faucet](https://faucet.celo.org/alfajores) and potentially [Ubeswap](https://app.ubeswap.org/).
2.  **Configure Private Key:** Add your wallet's private key to the `PRIVATE_KEY` variable in `.env.local`. **Ensure `.env.local` is listed in your `.gitignore` file.**
3.  **Run Deployment Script:** Execute the deployment command using Hardhat:
    ```bash
    npx hardhat run scripts/deploy-contract.js --network alfajores
    ```
    *(Confirm the script name, e.g., `deploy-celosave.js` or `deploy-contract.js`)*
4.  **Update Configuration:** Copy the deployed contract address provided in the script output and update the `alfajores` value within `CELOSAVE_CONTRACT_ADDRESS` in `lib/celo/config.ts`.
5.  **Restart Application:** Relaunch the development server (`npm run dev`).

For detailed instructions, refer to `DEPLOYMENT_GUIDE.md` or `BLOCKCHAIN_SETUP.md`.

## Troubleshooting

Common issues and solutions:

* **Goals Not Saving:**
    * *Supabase Mode:* Verify Supabase connection and ensure the migration script (`001_create_savings_goals_table.sql`) has been executed successfully.
    * *Blockchain Mode:* Confirm sufficient testnet CELO balance for gas fees and check CeloScan for transaction status.
* **"Contract not deployed" Banner/Errors:** This indicates the app is running in Supabase Mode because a valid contract address is not set in `lib/celo/config.ts`. Deploy the contract or continue using Supabase mode.
* **Transaction Failures (Blockchain Mode):** Ensure adequate CELO for gas, correct network selection (Alfajores), and sufficient cUSD balance for savings deposits. Check CeloScan for detailed error messages.
* **AI Assistant Issues:** Verify the `OPENAI_API_KEY` is correctly set in environment variables and the key is valid.
* **Wallet Connection Problems:** Confirm `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set. Note potential WalletConnect allowlist issues in certain preview environments; try MetaMask or an injected wallet if issues persist.

## Smart Contracts
ERC20-[0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8](https://alfajores.celoscan.io/address/0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8)
Escrow-[0xf8e81D47203A594245E36C48e151709F0C19fBe8](https://www.google.com/search?q=https://alfajores.celoscan.io/address/0xf8e81D47203A594245E36C48e151709F0C19fBe8)

## Resources

* [Celo Documentation](https://docs.celo.org)
* [Celo Alfajores Faucet](https://faucet.celo.org/alfajores)
* [CeloScan Testnet (Alfajores)](https://alfajores.celoscan.io)
* [Hardhat Documentation](https://hardhat.org/docs)
* [Supabase Documentation](https://supabase.com/docs)
* [Wagmi Documentation](https://wagmi.sh)
* [Vercel AI SDK](https://sdk.vercel.ai/docs)

## Contributing

Contributions are welcome. Please adhere to standard fork-and-pull-request workflows. Ensure code quality, include tests where applicable, and update documentation as needed.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

* Built for the Celo Blockchain community.
* Utilizes services and libraries from OpenAI, Supabase, Vercel, shadcn/ui, and the broader Web3 ecosystem.
