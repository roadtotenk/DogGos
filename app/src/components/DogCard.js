import React, { useState } from "react";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Tooltip,
  AspectRatio,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import * as ethers from "ethers";
import { FaDog, FaEthereum } from "react-icons/fa";
import DogTraits from "./DogTraits";
import AdoptButton from "./AdoptButton";

const DogCard = (props) => {
  const [isMinted, setIsMinted] = useState(Boolean(props.minted));
  const [isMinting, setIsMinting] = useState(false);
  //const [filter, setFilter] = useState("none");
  const { isOpen, onOpen, onClose } = useDisclosure();

  let badge = null;
  if (props.minted) {
    badge = (
      <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="yellow">
        Aready minted!
      </Badge>
    );
  } else if (isMinted) {
    badge = (
      <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="gray">
        Adopted!
      </Badge>
    );
  } else if (isMinting) {
    badge = (
      <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="blue">
        Minting...
      </Badge>
    );
  } else {
    badge = (
      <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
        Adoptable
      </Badge>
    );
  }

  return (
    <Flex p={4} alignItems="flex-start" id={props.id}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {!props.minted && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="green.200"
          />
        )}

        <AspectRatio w="320px" ratio={1 / 1}>
          <Image
            src={props.image_url}
            alt={`Picture of ${props.name}`}
            roundedTop="lg"
            style={{
              filter: props.status === "adopted" ? "grayscale(100%)" : "none",
            }}
          />
        </AspectRatio>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {badge}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              {props.name}
            </Box>
            <Tooltip
              label="View Details"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <Box>
                <IconButton
                  variant="outline"
                  icon={
                    <Icon
                      onClick={onOpen}
                      h={7}
                      w={7}
                      alignSelf={"center"}
                      as={FaDog}
                    />
                  }
                />
              </Box>
            </Tooltip>
            <DogTraits {...props} isOpen={isOpen} onClose={onClose} />
          </Flex>
          <Flex alignItems="center">
            {ethers.utils.formatEther(props.price)}
            <Icon as={FaEthereum} />
          </Flex>

          {!props.minted && props.status !== "adopted" ? (
            <AdoptButton
              id={props.id}
              name={props.name}
              price={props.price}
              setIsMinted={setIsMinted}
              isMinting={setIsMinting}
            />
          ) : null}
        </Box>
      </Box>
    </Flex>
  );
};

export default DogCard;
