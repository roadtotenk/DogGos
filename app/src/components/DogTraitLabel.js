import { HStack, Text } from "@chakra-ui/react";

const DogTraitLabel = ({ label, value }) => {
  return (
    <HStack gridGap={2} marginBottom={1} direction="row">
      <Text as="b" minW={135}>
        {label}:
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default DogTraitLabel;
