const hre = require("hardhat")

async function main() {
  console.log("Deploying CeloSave contract to Celo Alfajores...")

  // cUSD address on Alfajores testnet
  const CUSD_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

  const CeloSave = await hre.ethers.getContractFactory("CeloSave")
  const celoSave = await CeloSave.deploy(CUSD_ADDRESS)

  await celoSave.deployed()

  console.log("✅ CeloSave deployed to:", celoSave.address)
  console.log("\n📝 Update your lib/celo/config.ts with this address:")
  console.log(`alfajores: "${celoSave.address}",`)

  console.log("\n🔍 Verify on CeloScan:")
  console.log(`https://alfajores.celoscan.io/address/${celoSave.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
