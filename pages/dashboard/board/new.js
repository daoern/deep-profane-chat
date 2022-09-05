import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../../../components/layout";

export default function BoardNew() {
  const [boardName, setBoardName] = useState("");
  const [boardDomain, setBoardDomain] = useState("");

  const createBoard = async (e) => {
    e.preventDefault();
    try {
      const body = { boardName: boardName, boardDomain: boardDomain };
      const response = await fetch("/api/board/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("done!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={createBoard}>
        <VStack w="100%" align="left">
          <Heading as="h3" size="lg" my="24px">
            New board
          </Heading>

          <Heading as="h4" size="md">
            Board details
          </Heading>
          <Divider />
          <FormControl isRequired>
            <FormLabel>Board name</FormLabel>
            <Input
              placeholder="Sample board"
              onChange={(e) => setBoardName(e.target.value)}
              value={boardName}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Board domain</FormLabel>
            <Input
              placeholder="https://example.com"
              onChange={(e) => setBoardDomain(e.target.value)}
              value={boardDomain}
            />
          </FormControl>
          <Box p="12px"></Box>
          <Button type="submit">Create</Button>
        </VStack>
      </form>
    </Layout>
  );
}
