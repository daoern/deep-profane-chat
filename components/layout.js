import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import AuthButton from "./authButton";

export default function Layout({ children }) {
  return (
    <>
      <Box w="100%" p={4} borderBottomWidth="2px">
        <Container minW="container.sm">
          <Flex alignItems="center">
            <Image
              width="32px"
              height="32px"
              src="/logo.png"
              alt="Logo"
              mr="12px"
            />
            <Heading as="h4" size="md">
              DeepProfane Chat
            </Heading>
            <Spacer />
            <AuthButton />
          </Flex>
        </Container>
      </Box>
      <Container minW="container.sm" mb="24">
        <main>{children}</main>
      </Container>
    </>
  );
}
