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
    <HStack w="full" align="top" spacing="16px">
      <Avatar name={props.userName} src="https://bit.ly/broken-link" />

      <VStack align="left">
        <HStack align="top">
          <Heading as="h5" size="sm">
            {props.userName}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {new Date(props.date).toLocaleDateString("en-GB", {
              second: "numeric",
              minute: "numeric",
              hour: "numeric",
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour12: true,
            })}
          </Text>
        </HStack>

        <Text fontSize="sm">{props.msg}</Text>
      </VStack>
    </HStack>
  );
}
