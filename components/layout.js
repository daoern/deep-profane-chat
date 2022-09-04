import { Box, Container, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import AuthButton from "./authButton";

export default function Layout({ children }) {
  return (
    <>
      <Box w="100%" p={4} borderBottomWidth="2px">
        <Container>
          <Flex>
            <Heading as="h4" size="md">
              DeepProfane Chat
            </Heading>
            <Spacer />
            <AuthButton />
          </Flex>
        </Container>
      </Box>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
