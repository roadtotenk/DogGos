import { useState } from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import { getAnimalMetadataQuery } from "../utils/metadata";
import { useAccount } from "wagmi";
import { adoptAnimal } from "../utils/animal";
import adoptABI from "../abi/Adopt.json";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

const AdoptButton = (props) => {
  const [isMinting, setIsMinting] = useState(false);
  const { isConnected, address } = useAccount();

  // get metadata
  const metadataSql = getAnimalMetadataQuery(
    process.env.REACT_APP_ANIMAL_TRAITS_TABLE_NAME,
    props.id
  );

  const tokenUri = `https://testnet.tableland.network/query?mode=list&s=${encodeURIComponent(
    metadataSql
  )}`;

  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: adoptABI.abi,
    functionName: "mintNFT",
    args: [address, tokenUri],
    overrides: {
      value: props.price,
    },
  });

  const { write: writeMint } = useContractWrite({
    ...config,
    onSuccess(data) {
      adoptAnimal(props.id);
    },
    onSettled(data, error) {
      props.isMinting(false);
      setIsMinting(false);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const adoptDog = async () => {
    setIsMinting(true);
    props.isMinting(true);
    await writeMint();
    //adoptAnimal(props.id);
  };

  return (
    <>
      <Tooltip
        label="Connect wallet first"
        shouldWrapChildren
        isDisabled={isConnected}
      >
        <Button
          disabled={!isConnected || isMinting}
          onClick={adoptDog}
          mt={10}
          w={"full"}
          bg={"green.500"}
          color={"white"}
          rounded={"xl"}
          _hover={{
            bg: "green.400",
          }}
          _focus={{
            bg: "green.400",
          }}
        >
          Adopt {props.name}
        </Button>
      </Tooltip>
    </>
  );
};

export default AdoptButton;
