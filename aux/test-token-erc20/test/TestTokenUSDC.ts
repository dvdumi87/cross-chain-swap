// Hardhat test for TestTokenUSDC.sol
import { expect } from "chai";
import hre from "hardhat";

describe("TestTokenUSDC", function () {
  let usdc: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  const initialSupply = 1000n;
  const initialSupplyWei = hre.ethers.parseUnits(initialSupply.toString(), 18);

  beforeEach(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    const USDC = await hre.ethers.getContractFactory("TestTokenUSDC");
    usdc = await USDC.deploy(initialSupply);
    await usdc.waitForDeployment();
  });

  it("should have correct name and symbol", async function () {
    expect(await usdc.name()).to.equal("TestTokenUSDC");
    expect(await usdc.symbol()).to.equal("USDC");
  });

  it("should assign the initial supply to the owner", async function () {
    expect(await usdc.balanceOf(owner.address)).to.equal(initialSupplyWei);
  });

  it("should transfer tokens between accounts", async function () {
    await usdc.transfer(addr1.address, initialSupplyWei);
    expect(await usdc.balanceOf(addr1.address)).to.equal(initialSupplyWei);
  });

  it("should fail if sender doesn’t have enough tokens", async function () {
    await expect(
      usdc.connect(addr1).transfer(owner.address, 1)
    ).to.be.reverted
  });

  it("should update balances after transfers", async function () {
    await usdc.transfer(addr1.address, 1000);
    await usdc.connect(addr1).transfer(addr2.address, 500);
    expect(await usdc.balanceOf(addr1.address)).to.equal(500);
    expect(await usdc.balanceOf(addr2.address)).to.equal(500);
  });
});
