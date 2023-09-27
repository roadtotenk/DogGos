import React from "react";
import Header from "./Header";
import { Box } from "@chakra-ui/react";
import Banner from "./Banner";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Banner />
      <Box padding={14} minH="100vh" bg="gray.100">
        <section></section>
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
