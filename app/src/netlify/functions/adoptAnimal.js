const { Handler } = require("@netlify/functions");
const ethers = require("ethers");
// Need to use global fetch for Tableland when using node v16
import fetch, { Headers, Request, Response } from "node-fetch";

// Do this before tableland SDK
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}
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
