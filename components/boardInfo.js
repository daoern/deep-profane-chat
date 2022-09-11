import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function BoardInfo({ board }) {
  const [boardName, setBoardName] = useState(board.name);
  const [boardDomain, setBoardDomain] = useState(board.domain);
  const [boardTitle, setBoardTitle] = useState(board.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateBoard = async (e) => {
    e.preventDefault();
    if (isUpdating) {
      return;
    }
    setIsUpdating(true);
    try {
      const body = {
        boardId: board.id,
        boardName: boardName,
        boardTitle: boardTitle,
        boardDomain: boardDomain,
      };
      const response = await fetch("/api/board/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setIsEditing(false);
      alert("Saved!");
    } catch (error) {
      console.error(error);
    }
    setIsUpdating(false);
  };

  return (
    <VStack w="full" align="left">
      <form onSubmit={updateBoard}>
        <Flex>
          <Heading as="h4" size="md">
            Details
          </Heading>
          <Spacer />
          {isEditing ? (
            <Button float="right" type="submit" isLoading={isUpdating}>
              Save
            </Button>
          ) : (
            <IconButton
              onClick={() => setIsEditing(true)}
              float="right"
              icon={<EditIcon />}
            >
              Edit
            </IconButton>
          )}
        </Flex>
        <FormControl>
          <FormLabel>Board name</FormLabel>
          <Input
            placeholder="Sample board"
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Board title</FormLabel>
          <Input
            placeholder="Comments"
            onChange={(e) => setBoardTitle(e.target.value)}
            value={boardTitle}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Board domain</FormLabel>
          <Input
            placeholder="https://example.com"
            onChange={(e) => setBoardDomain(e.target.value)}
            value={boardDomain}
            readOnly={!isEditing}
          />
        </FormControl>
        <Box py="12px"></Box>
      </form>
    </VStack>
  );
}
