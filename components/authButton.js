import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Link,
} from "@chakra-ui/react";
import Login from "../pages/login";

export default function AuthButton({ usePopup = false }) {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <Button
        onClick={() => (usePopup ? window.open("/login") : signIn())}
        isLoading={status === "loading"}
      >
        Sign In
      </Button>
    );
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
        <Avatar size="sm" name={session.user.name} />
      </MenuButton>
      <MenuList>
        <Box p="12px">{session.user.email}</Box>
        <MenuItem>
          <Link href="/dashboard" isExternal={usePopup}>
            Dashboard {usePopup ? <ExternalLinkIcon mx="2px" /> : <></>}
          </Link>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
}
