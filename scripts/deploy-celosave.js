const hre = require("hardhat")

async function main() {
  console.log("🚀 Deploying CeloSave contract to Celo Alfajores testnet...")

  // Get the contract factory
  const CeloSave = await hre.ethers.getContractFactory("CeloSave")

  // Get cUSD address for Alfajores testnet
  const CUSD_ALFAJORES = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

  console.log("📝 Deploying with cUSD address:", CUSD_ALFAJORES)

  // Deploy the contract
  const celoSave = await CeloSave.deploy(CUSD_ALFAJORES)

  await celoSave.waitForDeployment()

  const address = await celoSave.getAddress()

  console.log("✅ CeloSave deployed to:", address)
  console.log("\n📋 Next steps:")
  console.log("1. Copy the contract address above")
  console.log("2. Update lib/celo/config.ts with this address")
  console.log("3. Verify the contract on CeloScan (optional):")
  console.log(`   npx hardhat verify --network alfajores ${address} ${CUSD_ALFAJORES}`)
  console.log("\n🔗 View on CeloScan:")
  console.log(`   https://alfajores.celoscan.io/address/${address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
