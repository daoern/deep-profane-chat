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
  const [boardTitle, setBoardTitle] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  const createBoard = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const body = {
        boardName: boardName,
        boardTitle: boardTitle,
        boardDomain: boardDomain,
      };
      const response = await fetch("/api/board/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const newBoard = await response.json();
      window.location.href = `/dashboard/board/${newBoard.id}`;
    } catch (error) {
      console.error(error);
    }
    setIsCreating(false);
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
          <Box py="12px"></Box>
          <FormControl isRequired>
            <FormLabel>Board name</FormLabel>
            <Input
              placeholder="Sample board"
              onChange={(e) => setBoardName(e.target.value)}
              value={boardName}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Board title</FormLabel>
            <Input
              placeholder="Comments"
              onChange={(e) => setBoardTitle(e.target.value)}
              value={boardTitle}
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
          <Box py="12px">
            <Button float="right" type="submit" isLoading={isCreating}>
              Create
            </Button>
          </Box>
        </VStack>
      </form>
    </Layout>
  );
}
