import {
  Avatar,
  Text,
  Box,
  Heading,
  VStack,
  Spacer,
  HStack,
  Badge,
} from "@chakra-ui/react";
import React from "react";

export default function Message(props) {
  return (
    <HStack w="full" align="top">
      <Avatar name={props.userName} src="https://bit.ly/broken-link" />

      <VStack align="left">
        <Heading as="h5" size="sm">
          {props.userName}
          <Badge>{props.date.toLocaleString()}</Badge>
        </Heading>
        <Text fontSize="sm">{props.msg}</Text>
      </VStack>
    </HStack>
  );
}
