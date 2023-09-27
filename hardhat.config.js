require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");

chai.use(solidity);

require("dotenv").config();

const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: ALCHEMY_API_URL,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    hardhat: {
      chainId: 31337,
    },
  },
};
