import { useSession, signIn, signOut } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Layout({ children }) {
  const { data: session } = useSession();
  let authBtn = session ? (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        background="transparent"
        _active={{ bg: "transparent" }}
        _hover={{ bg: "transparent" }}
        _expanded={{ bg: "transparent" }}
      >
        <Avatar size="sm" name={session.user.email} />
      </MenuButton>
      <MenuList>
        <Box p="12px">{session.user.email}</Box>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Button onClick={() => signIn()}>Sign In</Button>
  );
  return (
    <>
      <Box w="100%" p={4} borderBottomWidth="2px">
        <Container>
          <Flex>
            <Heading as="h4" size="md">
              DeepProfane Chat
            </Heading>
            <Spacer />
            {authBtn}
          </Flex>
        </Container>
      </Box>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
