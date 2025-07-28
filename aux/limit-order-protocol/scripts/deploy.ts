import { ethers } from "hardhat";

const wethByNetwork: Record<string, string> = {
    'hardhat': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    'mainnet': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    'etherlinktest': '0x86932ff467A7e055d679F7578A0A4F96Be287861',
    'sepolia': '0x67019c0e595f4adba583FB760D6168d9a44982ea',
    'xlayertest': '0x7B05b8cb6B56dd2614f7F7457046561B1851FAc4'
};

export const DeployContracts = async (): Promise<Boolean> => {
  const network = await ethers.provider.getNetwork();
  console.log("using network: ", network.toJSON());
  const networkName = network.name;
  if (!wethByNetwork[networkName]) {
    console.log("No WETH address for network ", networkName);
    return false;
  }
  const [signer] = await ethers.getSigners();
  console.log("deployer address: ", signer.address);
  const contractFact = await ethers.getContractFactory("LimitOrderProtocol");
  const contract = await contractFact.deploy(wethByNetwork[network.name]);
  console.log("contract address: ", contract.target);
  await contract.waitForDeployment();

  console.log("LimitOrderProtocol address: ", contract.target);


  return true;
}

// Only run if this file is being run directly, not when imported
if (require.main === module) {
  DeployContracts().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}