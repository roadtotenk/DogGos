import { Handler } from "@netlify/functions";
const ethers = require("ethers");
const tableland = require("@tableland/sdk");

require("dotenv").config();

const handler = async (event, context) => {
  const privateKey = process.env.WALLET_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey);

  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.ALCHEMY_API_KEY
  );

  const signer = wallet.connect(provider);
  const tblConnection = await tableland.connect({
    signer,
    network: "testnet",
    chain: "ethereum-goerli",
  });

  const result = tblConnection
    .write(
      `UPDATE
            ${process.env.ANIMALS_TABLE_NAME}
        SET
            minted=1
        WHERE
            id=${event.queryStringParameters.id}`
    )
    .then((r) => console.log(r));

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

export { handler };
