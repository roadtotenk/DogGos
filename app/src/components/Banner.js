import { Flex, Box } from "@chakra-ui/react";
import OrgEarnings from "./OrgEarnings";

const Banner = (props) => {
  return (
    <Flex
      p={4}
      alignItems="center"
      backgroundColor="gray.800"
      color="whiteAlpha.900"
    >
      <Box flexGrow={1} fontSize="2xl">
        Mike's Mutts Pet Shelter
      </Box>
      <Box>
        <OrgEarnings />
      </Box>
    </Flex>
  );
};

export default Banner;
