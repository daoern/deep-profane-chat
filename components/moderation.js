import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

export default function Moderation({ flaggedComments }) {
  const [comments, setComments] = useState(flaggedComments);
  const [commentIdUpdating, setCommentIdUpdating] = useState(-1);

  const setCommentFlag = async (commentId, profane) => {
    if (commentIdUpdating > -1) {
      return;
    }
    setCommentIdUpdating(commentId);
    try {
      const body = { commentId: commentId, profane: profane };
      const response = await fetch("/api/comment/flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const newComment = await response.json();
      setComments(comments.filter((comment) => comment.id != commentId));
    } catch (error) {
      console.error(error);
    }
    setCommentIdUpdating(-1);
  };

  const deleteComment = async (commentId) => {
    if (commentIdUpdating > -1) {
      return;
    }
    setCommentIdUpdating(commentId);
    try {
      const body = { commentId: commentId };
      const response = await fetch("/api/comment/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const newComment = await response.json();
      setComments(comments.filter((comment) => comment.id != commentId));
    } catch (error) {
      console.error(error);
    }
    setCommentIdUpdating(-1);
  };

  return (
    <VStack w="100%" align="left">
      <Heading as="h4" size="md">
        Moderation
      </Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th pl={0}>Blocked comment</Th>
              <Th isNumeric pr={0}>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {comments.map((comment) => (
              <Tr key={comment.id}>
                <Td pl={0} color="gray.500">
                  {comment.content}
                </Td>
                <Td isNumeric pr={0}>
                  {commentIdUpdating == comment.id ? (
                    <Spinner />
                  ) : (
                    <ButtonGroup size="sm" variant="ghost">
                      <Button
                        onClick={() => setCommentFlag(comment.id, false)}
                        colorScheme="red"
                      >
                        Unflag
                      </Button>
                      <Button
                        onClick={() => deleteComment(comment.id)}
                        colorScheme="teal"
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
