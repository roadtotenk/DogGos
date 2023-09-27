import { Handler } from "@netlify/functions";
const petfinder = require("@petfinder/petfinder-js");
const ethers = require("ethers");
const tableland = require("@tableland/sdk");

require("dotenv").config();

const pfClient = new petfinder.Client({
  apiKey: process.env.PETFINDER_API_KEY,
  secret: process.env.PETFINDER_SECRET_KEY,
});

const getAnimals = async () => {
  const dogs = await pfClient.animal.search({
    type: "Dog",
    limit: 100,
    status: "adoptable",
    organization: process.env.PETFINDER_SHELTER_ID,
  });

  return dogs.data?.animals;
};

const handler = async (event, context) => {
  const privateKey = process.env.WALLET_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey);
  const createDate = Date.now();

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

  // get dogs from Petfinder API
  const dogs = await getAnimals();

  // get current animals by org_id
  const dogResults = await tblConnection.read(
    `SELECT id, status FROM ${process.env.ANIMALS_TABLE_NAME} WHERE org_id='${process.env.PETFINDER_ORG_ID}';`
  );
  const dogRows = tableland.resultsToObjects(dogResults);

  // add or update dog
  dogs.forEach((dog, i) => {
    setTimeout(() => {
      const dogRow = dogRows.find((d) => d.id == dog.id);

      if (
        !dogRow &&
        dog.status === "adoptable" &&
        dog.primary_photo_cropped?.full
      ) {
        console.log("ADD DOG", dog.id);

        // Add to animals
        tblConnection
          .write(
            `INSERT INTO ${process.env.ANIMALS_TABLE_NAME} (id, org_id, status, date_created, minted, date_adopted) VALUES (${dog.id}, '${process.env.PETFINDER_ORG_ID}', 'adoptable', ${createDate}, 0, null);`
          )
          .then((r) => console.log("Added", r));

        // Add animal traits
        console.log("ADD TRAITS");
        setTimeout(() => {
          tblConnection
            .write(
              `INSERT INTO ${process.env.ANIMAL_TRAITS_TABLE_NAME} (
                id,
                name,
                primary_breed,
                secondary_breed,
                is_mixed,
                primary_color,
                secondary_color,
                age,
                gender,
                size,
                description,
                image_url,
                url
            ) VALUES (
                 ${dog.id},
                '${dog.name}',
                '${dog.breeds.primary || "none"}',
                '${dog.breeds.secondary || "none"}',
                 ${dog.breeds.mixed},
                '${dog.colors.primary || "none"}',
                '${dog.colors.secondary || "none"}',
                '${dog.age || "none"}',
                '${dog.gender || "none"}',
                '${dog.size || "none"}',
                '${dog.description || "none"}',
                '${dog.primary_photo_cropped.full}',
                '${dog.url || ""}'
            );`
            )
            .then((r) => console.log("Added Traits", r));
        }, 1000);
      } else if (
        dogRow &&
        dogRow.status === "adoptable" &&
        dog.status === "adopted"
      ) {
        console.log("UPDATE DOG", dog.id);

        tblConnection
          .write(
            `UPDATE ${process.env.ANIMALS_TABLE_NAME} SET status='adopted', date_adopted=${createDate} WHERE id=${dog.id}`
          )
          .then((r) => console.log(r));
      }
    }, i * 1000);
  });

  return {
    statusCode: 200,
    body: JSON.stringify(dogs),
  };
};

export { handler };
