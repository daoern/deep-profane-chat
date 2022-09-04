import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
} from "@chakra-ui/react";

export default function AuthButton() {
  const { data: session } = useSession();
  if (!session) {
    return <Button onClick={() => signIn()}>Sign In</Button>;
  }
  return (
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
  );
}