// Hardhat test for TestTokenWETH.sol
import { expect } from "chai";
import hre from "hardhat";

describe("TestTokenWETH", function () {
  let weth: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  const initialSupply = 1000n;
  const initialSupplyWei = hre.ethers.parseUnits(initialSupply.toString(), 18);

  beforeEach(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    const WETH = await hre.ethers.getContractFactory("TestTokenWETH");
    weth = await WETH.deploy(initialSupply);
    await weth.waitForDeployment();
  });

  it("should have correct name and symbol", async function () {
    expect(await weth.name()).to.equal("TestTokenWETH");
    expect(await weth.symbol()).to.equal("WETH");
  });

  it("should assign the initial supply to the owner", async function () {
    expect(await weth.balanceOf(owner.address)).to.equal(initialSupplyWei);
  });

  it("should transfer tokens between accounts", async function () {
    await weth.transfer(addr1.address, initialSupplyWei);
    expect(await weth.balanceOf(addr1.address)).to.equal(initialSupplyWei);
  });

  it("should fail if sender doesn’t have enough tokens", async function () {
    await expect(
      weth.connect(addr1).transfer(owner.address, 1)
    ).to.be.reverted
  });

  it("should update balances after transfers", async function () {
    await weth.transfer(addr1.address, 1000);
    await weth.connect(addr1).transfer(addr2.address, 500);
    expect(await weth.balanceOf(addr1.address)).to.equal(500);
    expect(await weth.balanceOf(addr2.address)).to.equal(500);
  });
});
