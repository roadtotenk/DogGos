import * as ethers from "ethers";
import { useContractRead } from "wagmi";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import adoptABI from "../abi/Adopt.json";

const OrgEarnings = (props) => {
  const { data: releasedData, isLoading: releasedLoading } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: adoptABI.abi,
    functionName: "released(address)",
    args: process.env.REACT_APP_ORG_WALLET_ADDRESS,
  });

  const { data: releasableData, isLoading: releasableLoading } =
    useContractRead({
      addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
      contractInterface: adoptABI.abi,
      functionName: "released(address)",
      args: process.env.REACT_APP_ORG_WALLET_ADDRESS,
    });

  if (releasableLoading || releasedLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex alignItems="center">
      <Text mr={2}>Total Earned:</Text>
      {ethers.utils.formatEther(releasedData.add(releasableData))}
      <Icon as={FaEthereum} />
    </Flex>
  );
};

export default OrgEarnings;
