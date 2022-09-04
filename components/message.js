import {
  Avatar,
  Text,
  Box,
  Heading,
  VStack,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import React from "react";

export default function Message(props) {
  return (
    <HStack w="full">
      <Avatar name={props.userName} src="https://bit.ly/broken-link" />

      <VStack align="left">
        <Heading as="h5" size="sm">
          {props.userName}
        </Heading>
        <Text fontSize="sm">{props.msg}</Text>
      </VStack>
    </HStack>
  );
}
