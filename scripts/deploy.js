const hre = require("hardhat");

const payees = [
  "0x0D5CC855b24e3D7f4430bBfD52b04C9d594ACE31",
  "0x44D54D4Df70054d674F86E077C464623a83f4114",
];
const shares = ["90", "10"];

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Adopt = await ethers.getContractFactory("Adopt");
  const adopt = await Adopt.deploy("Adopt", "DOGGOS", payees, shares);

  console.log("Adopt address:", adopt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
