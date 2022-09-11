import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Fade,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Image,
  Input,
  ScaleFade,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import AuthButton from "../../components/authButton";
import Message from "../../components/message";
import prisma from "../../lib/prisma";

export default function Chat({ commentList, board }) {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { key } = router.query;

  const commentContainerRef = useRef();

  const [comments, setComments] = useState(commentList);
  const [commentInput, setCommentInput] = useState("");
  const [newCommentId, setNewCommentId] = useState(-1);
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
        commentContainerRef.current.scrollTo(0, 0);
        setComments([newComment, ...comments]);
        setNewCommentId(newComment.id);
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
        <VStack alignItems="left">
          <Heading as="h4" size="md">
            {board.title}
          </Heading>
          <HStack>
            <Image width="16px" height="16px" src="/logo.png" alt="Logo" />
            <Text fontSize="xs" color="gray.400">
              Powered by DeepProfane Chat
            </Text>
          </HStack>
        </VStack>
        <Spacer />
        <AuthButton usePopup={true} />
      </Flex>
      <Divider marginBottom="12px" />
      {comments.length === 0 ? (
        <Box p="24px">
          <Center>No comments</Center>
        </Box>
      ) : (
        <Box maxH="sm" overflowY="scroll" ref={commentContainerRef}>
          <VStack spacing="16px">
            {comments.map((comment) => {
              return (
                <Message
                  key={comment.id}
                  userName={comment.user.name}
                  msg={comment.content}
                  date={comment.createdAt}
                />
              );
            })}
          </VStack>
        </Box>
      )}
      <Divider my="12px" />
      <form onSubmit={postComment}>
        <Tooltip
          label="Please login to enter comment"
          placement="top"
          color="white"
          isDisabled={status === "authenticated"}
        >
          <HStack align="top">
            <FormControl isInvalid={isInputProfane}>
              <Input
                placeholder="Enter comment"
                onChange={(e) => setCommentInput(e.target.value)}
                value={commentInput}
                disabled={isPosting || status !== "authenticated"}
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
        </Tooltip>
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
