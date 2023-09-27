const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config();

const { adoptABI } = require("../artifacts/contracts/Adopt.sol/Adopt.json");
const { hexStripZeros } = require("ethers/lib/utils");
const { BigNumber } = require("ethers");
//const { ethers } = require("ethers");

describe("Adopt contract", async function () {
  const _name = "Adopt";
  const _symbol = "DOGGOS";
  const _tokenUri =
    "https://bafkreib5t4ekjpzzimyiwclaovwdeacriay5ugq4zo6w64ckzus5e55hx4.ipfs.nftstorage.link/";
  const recipient = "0x44D54D4Df70054d674F86E077C464623a83f4114";
  const adoptAddressGoerli = "0xE32B7aBFbc03fA5a6955a5C6667a45e8cc03939E";
  const payees = [
    "0x0D5CC855b24e3D7f4430bBfD52b04C9d594ACE31",
    "0x44D54D4Df70054d674F86E077C464623a83f4114",
  ];
  const shares = ["90", "10"];

  async function deployTokenFixture() {
    const [owner, account1, ...otheraccounts] = await ethers.getSigners();

    const hardhatAdopt = await hre.ethers.getContractAt(
      "Adopt",
      adoptAddressGoerli
    );

    return { hardhatAdopt, owner, account1 };
  }

  async function deployLocalTokenFixture() {
    const [owner, account1, ...otheraccounts] = await ethers.getSigners();

    const Adopt = await ethers.getContractFactory("Adopt");
    const hardhatAdopt = await Adopt.deploy("Adopt", "DOGGOS", payees, shares);

    await hardhatAdopt.deployed();

    return { hardhatAdopt, owner, account1 };
  }

  // You can nest describe calls to create subsections.

  /*
  it("Should have the correct name and symbol ", async function () {
    //const { hardhatAdopt } = await loadFixture(deployLocalTokenFixture);
    const { hardhatAdopt, owner } = await deployTokenFixture();

    expect(await hardhatAdopt.name()).to.equal(_name);
    expect(await hardhatAdopt.symbol()).to.equal(_symbol);
  });

  it("Org Wallet Share should be 90% ", async function () {
    //const { hardhatAdopt } = await loadFixture(deployLocalTokenFixture);
    const { hardhatAdopt } = await deployTokenFixture();

    expect(await hardhatAdopt.shares(payees[0])).to.equal(90);
  });

  it("Dev Wallet Share should be 10% ", async function () {
    //const { hardhatAdopt } = await loadFixture(deployLocalTokenFixture);
    const { hardhatAdopt } = await deployTokenFixture();

    expect(await hardhatAdopt.shares(payees[1])).to.equal(10);
  });
  */

  it("Should return total earnings", async function () {
    //const { hardhatAdopt } = await loadFixture(deployLocalTokenFixture);
    const { hardhatAdopt } = await deployTokenFixture();

    console.log(await hardhatAdopt.getTotalEarnings(payees[0]));
    //expect(await hardhatAdopt.getTotalEarnings(payees[0])).to.be.greaterThan(0);
  });

  /*
  it("Should mint a token with token ID to recipent", async function () {
    // const { hardhatAdopt, account1 } = await loadFixture(
    //   deployLocalTokenFixture
    // );
    const { hardhatAdopt, owner } = await deployTokenFixture();

    await hardhatAdopt.mintNFT(recipient, _tokenUri, {
      value: "10000000000000000",
    });

    expect(await hardhatAdopt.ownerOf(4)).to.equal(recipient);
  });

  it("Should move 90% of payment to Org Wallet", async function () {
    const { hardhatAdopt } = await deployTokenFixture();

    const orgWalletBalance = await hardhatAdopt["releasable(address)"](
      payees[0]
    );
    console.log(orgWalletBalance);
  });
  */
});
