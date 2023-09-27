import { React, useEffect, useState } from "react";
import * as tableland from "@tableland/sdk";
import { useContractRead } from "wagmi";
import adoptABI from "../abi/Adopt.json";
import DogCard from "./DogCard";
import { Flex } from "@chakra-ui/react";

const DogList = () => {
  const [dogs, setDogs] = useState([]);

  const { data } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: adoptABI.abi,
    functionName: "getCost",
  });

  useEffect(() => {
    //console.log(data);
  }, [data]);

  useEffect(() => {
    const getDogs = async () => {
      const tblConnection = await tableland.connect({
        network: "testnet",
        chain: "ethereum-goerli",
      });

      const dogResults = await tblConnection.read(`
      SELECT
        a.id,
        a.status,
        a.minted,
        t.name,
        t.image_url,
        t.primary_breed,
        t.secondary_breed,
        t.is_mixed,
        t.primary_color,
        t.secondary_color,
        t.age,
        t.gender,
        t.size,
        t.description,
        t.url
      FROM
        ${process.env.REACT_APP_ANIMALS_TABLE_NAME} a
        JOIN ${process.env.REACT_APP_ANIMAL_TRAITS_TABLE_NAME} as t
      WHERE
        a.id = t.id
        AND a.org_id='${process.env.REACT_APP_PETFINDER_ORG_ID}';
      `);

      return tableland.resultsToObjects(dogResults);
    };
    getDogs().then((d) => {
      setDogs(d);
    });
  }, []);

  return (
    <Flex wrap="wrap" direction="row" justifyContent="center">
      {dogs.map((d) => {
        return <DogCard {...d} key={d.id} price={data.toString()} />;
      })}
    </Flex>
  );
};

export default DogList;
