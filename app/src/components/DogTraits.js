import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import DogTraitLabel from "./DogTraitLabel";

const DogTraits = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"}>
            <DogTraitLabel label="Primary Breed" value={props.primary_breed} />
            {props.secondary_breed !== "none" ? (
              <DogTraitLabel
                label="Secondary Breed"
                value={props.secondary_breed}
              />
            ) : (
              ""
            )}
            {props.is_mixed ? (
              <DogTraitLabel
                label="Mixed Breed"
                value={props.is_mixed ? "Yes" : "No"}
              />
            ) : (
              ""
            )}
            {props.primary_color !== "none" ? (
              <DogTraitLabel
                label="Primary Color"
                value={props.primary_color}
              />
            ) : (
              ""
            )}
            {props.secondary_color !== "none" ? (
              <DogTraitLabel
                label="Secondary Color"
                value={props.secondary_color}
              />
            ) : (
              ""
            )}
            <DogTraitLabel label="Age" value={props.age} />
            <DogTraitLabel label="Gender" value={props.gender} />
            <DogTraitLabel label="Size" value={props.size} />
            <Text marginTop={2}>{props.description}</Text>
            <Link marginTop={4} colorScheme="green" href={props.url} isExternal>
              <Flex alignItems="center">
                View on Petfinder.com <ExternalLinkIcon mx="2px" />
              </Flex>
            </Link>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DogTraits;
