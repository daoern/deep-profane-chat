import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthButton from "../../components/authButton";
import Message from "../../components/message";
import prisma from "../../lib/prisma";

export default function Chat({ commentList, board }) {
  const router = useRouter();
  const { key } = router.query;

  const [comments, setComments] = useState(commentList);
  const [commentInput, setCommentInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isInputProfane, setIsInputProfane] = useState(false);

  const postComment = async (e) => {
    e.preventDefault();
    if (commentInput.length === 0) return;
    setIsPosting(true);
    try {
      const body = { boardId: board.id, comment: commentInput };
      const response = await fetch("/api/comment/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const newComment = await response.json();
      if (newComment.profane) {
        setIsInputProfane(true);
      } else {
        setComments([newComment, ...comments]);
        setCommentInput("");
        setIsInputProfane(false);
      }
    } catch (error) {
      console.error(error);
    }
    setIsPosting(false);
  };

  return (
    <Box
      // maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="12px"
    >
      <Flex alignItems="center" pb="12px">
        <Heading as="h3" size="lg">
          {board.name}
        </Heading>
        <Text fontSize="xs" color="gray.400" pl="24px">
          Powered by DeepProfane Chat
        </Text>
        <Spacer />
        <AuthButton usePopup={true} />
      </Flex>
      <Divider marginBottom="12px" />
      {comments.length === 0 ? (
        <Box p="24px">
          <Center>No comments</Center>
        </Box>
      ) : (
        <Box maxH="sm" overflowY="scroll">
          <VStack spacing="16px">
            {comments.map((comment) => (
              <Message
                key={comment.id}
                userName={comment.user.name}
                msg={comment.content}
                date={comment.createdAt}
              ></Message>
            ))}
          </VStack>
        </Box>
      )}
      <Divider my="12px" />
      <form onSubmit={postComment}>
        <HStack align="top">
          <FormControl isInvalid={isInputProfane}>
            <Input
              placeholder="Enter comment"
              onChange={(e) => setCommentInput(e.target.value)}
              value={commentInput}
              disabled={isPosting}
            />
            {isInputProfane ? (
              <FormErrorMessage>
                Your comment contains profanity!
              </FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <Button type="submit" isLoading={isPosting}>
            Publish
          </Button>
        </HStack>
      </form>
    </Box>
  );
}

export async function getServerSideProps({ params }) {
  const board = await prisma.board.findUnique({
    where: {
      key: String(params?.key),
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      AND: [{ boardId: board.id }, { profane: false }, { deleted: false }],
    },
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return {
    props: {
      commentList: JSON.parse(JSON.stringify(comments)),
      board: JSON.parse(JSON.stringify(board)),
    },
  };
}
