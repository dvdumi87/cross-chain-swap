import { ethers } from "hardhat";
import { updateEnvFile } from "./utils";

const USER_ADDRESS = process.env.USER_ADDRESS || ""
const RESOLVER_ADDRESS = process.env.RESOLVER_ADDRESS || ""

export const DeployContracts = async (): Promise<Boolean> => {
  const network = await ethers.provider.getNetwork();
  console.log("using network: ", network.toJSON());
  const [signer] = await ethers.getSigners();
  console.log("deployer address: ", signer.address);
  const contractFact = await ethers.getContractFactory("TestTokenUSDC");
  const contract = await contractFact.deploy(10000000000);
  console.log("contract address: ", contract.target);
  await contract.waitForDeployment();

  console.log("TestTokenUSDC address: ", contract.target);

  const keyName = network.name.toUpperCase() + "_USDC_ADDRESS";
  const addrs = {
    [keyName]: contract.target.toString(),
  }
  updateEnvFile(addrs);

  const amount = 5000n * 10n ** (await contract.decimals());
  await contract.transfer(USER_ADDRESS, amount);
  await contract.transfer(RESOLVER_ADDRESS, amount);

  return true;
}

// Only run if this file is being run directly, not when imported
if (require.main === module) {
  DeployContracts().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}