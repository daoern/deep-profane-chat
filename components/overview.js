import React, { useState } from "react";
import {
  Box,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import BoardInfo from "./boardInfo";

export default function Overview({ board, commentCount }) {
  return (
    <VStack w="100%" align="left">
      <Heading as="h4" size="md">
        Statistics
      </Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Total</StatLabel>
          <StatNumber>{commentCount.total}</StatNumber>
          <StatHelpText>comments</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Blocked</StatLabel>
          <StatNumber>{commentCount.flagged}</StatNumber>
          <StatHelpText>comments</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Deleted</StatLabel>
          <StatNumber>{commentCount.deleted}</StatNumber>
          <StatHelpText>comments</StatHelpText>
        </Stat>
      </StatGroup>
      <List>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Comments are automatically flagged for profanity.
        </ListItem>
      </List>
      <Box py="4" />
      <BoardInfo board={board} />
    </VStack>
  );
}
