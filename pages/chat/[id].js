import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Message from "../../components/message";
import prisma from "../../lib/prisma";

export default function Chat({ commentList }) {
  const router = useRouter();
  const { id } = router.query;

  const [comments, setComments] = useState(commentList);
  const [commentInput, setCommentInput] = useState("");

  const postComment = async (e) => {
    e.preventDefault();
    if (commentInput.length === 0) return;
    try {
      const body = { boardId: id, comment: commentInput };
      const response = await fetch("/api/addComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const newComment = await response.json();
      setComments([...comments, newComment]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      // maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="12px"
    >
      <Heading as="h3" size="lg">
        {comments[0].board.name}
      </Heading>
      <Divider marginBottom="12px" />
      <Box maxH="sm" overflowY="scroll">
        <VStack>
          {comments.map((comment) => (
            <Message
              key={comment.id}
              userName={comment.user.name}
              msg={comment.content}
            ></Message>
          ))}
        </VStack>
      </Box>
      <Divider marginBottom="12px" />
      <form onSubmit={postComment}>
        <HStack>
          <Input
            placeholder="Comment"
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          />
          <Button type="submit">Send</Button>
        </HStack>
      </form>
    </Box>
  );
}

export async function getServerSideProps({ params }) {
  const comments = await prisma.comment.findMany({
    where: {
      boardId: parseInt(params?.id),
    },
    include: {
      user: {
        select: { name: true },
      },
      board: {
        select: { name: true },
      },
    },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });
  return {
    props: {
      commentList: JSON.parse(JSON.stringify(comments)),
    },
  };
}
