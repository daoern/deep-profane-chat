import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Code,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../../../components/layout";
import prisma from "../../../lib/prisma";

export default function BoardAdmin({ board, commentCount, flaggedComments }) {
  return (
    <Layout>
      <VStack w="100%" align="left">
        <Heading as="h3" size="lg" my="24px">
          {board.name}
        </Heading>
        <Heading as="h4" size="md">
          Overview
        </Heading>
        <Divider />
        <StatGroup>
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>{commentCount.total}</StatNumber>
            <StatHelpText>comments</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Blocked</StatLabel>
            <StatNumber>{commentCount.flagged}</StatNumber>
            <StatHelpText>comments</StatHelpText>
          </Stat>
          {/* <Stat>
            <StatLabel>Deleted</StatLabel>
            <StatNumber>{commentCount.deleted}</StatNumber>
            <StatHelpText>comments</StatHelpText>
          </Stat> */}
        </StatGroup>
        <List>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Comments are automatically flagged for profanity.
          </ListItem>
        </List>

        <Box p="12px"></Box>
        <Heading as="h4" size="md">
          Moderation
        </Heading>
        <Divider />
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th pl={0}>Blocked comment</Th>
                {/* <Th isNumeric pr={0}>
                  Action
                </Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {flaggedComments.map((comment) => (
                <Tr key={comment.id}>
                  <Td pl={0} color="gray.500">
                    {comment.content}
                  </Td>
                  {/* <Td isNumeric pr={0}>
                    <ButtonGroup size="sm" variant="ghost">
                      <Button colorScheme="red">Unflag</Button>
                      <Button colorScheme="teal">Delete</Button>
                    </ButtonGroup>
                  </Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Box p="12px"></Box>
        <Heading as="h4" size="md">
          Integration
        </Heading>
        <Divider />
        <Text>API Key of this board.</Text>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          padding="12px"
        >
          <Code>{board.key}</Code>
        </Box>
        <Text>
          Copy paste the following code into your website to implement
          DeepProfane Chat.
        </Text>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          padding="12px"
        >
          <Code>{board.key}</Code>
        </Box>
        <Box p="12px"></Box>
      </VStack>
    </Layout>
  );
}
{
  /* <iframe
  src="https://deep-profane.herokuapp.com/chat/1"
  width="100%"
  height="800"
  frameborder="0"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>; */
}
export async function getServerSideProps({ params }) {
  const board = await prisma.board.findUnique({
    where: {
      id: parseInt(params?.id),
    },
  });
  const totalComment = await prisma.comment.count({
    where: {
      boardId: parseInt(params?.id),
    },
  });
  const flaggedComment = await prisma.comment.count({
    where: {
      AND: [{ boardId: parseInt(params?.id) }, { profane: true }],
    },
  });
  const deletedComment = await prisma.comment.count({
    where: {
      AND: [{ boardId: parseInt(params?.id) }, { deleted: true }],
    },
  });
  const flaggedComments = await prisma.comment.findMany({
    where: {
      AND: [
        { boardId: parseInt(params?.id) },
        { profane: true },
        { deleted: false },
      ],
    },
  });
  return {
    props: {
      board: JSON.parse(JSON.stringify(board)),
      commentCount: {
        total: totalComment,
        flagged: flaggedComment,
        deleted: deletedComment,
      },
      flaggedComments: JSON.parse(JSON.stringify(flaggedComments)),
    },
  };
}
