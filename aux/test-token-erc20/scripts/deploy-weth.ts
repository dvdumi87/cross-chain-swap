import { ethers } from "hardhat";

export const DeployContracts = async (): Promise<Boolean> => {
  const network = await ethers.provider.getNetwork();
  console.log("using network: ", network.toJSON());
  const [signer] = await ethers.getSigners();
  console.log("deployer address: ", signer.address);
  const contractFact = await ethers.getContractFactory("TestTokenWETH");
  const contract = await contractFact.deploy(1000000000);
  console.log("contract address: ", contract.target);
  await contract.waitForDeployment();

  console.log("TestTokenWETH address: ", contract.target);


  return true;
}

// Only run if this file is being run directly, not when imported
if (require.main === module) {
  DeployContracts().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}