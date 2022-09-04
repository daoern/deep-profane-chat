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

export default function BoardAdmin({ board }) {
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
            <StatLabel>All</StatLabel>
            <StatNumber>56</StatNumber>
            <StatHelpText>comments</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Flagged</StatLabel>
            <StatNumber>2</StatNumber>
            <StatHelpText>comments</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Moderated</StatLabel>
            <StatNumber>2</StatNumber>
            <StatHelpText>comments</StatHelpText>
          </Stat>
        </StatGroup>
        <List>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Comments are automatically flagged by DeepProfane.
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
                <Th>Flagged comment</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Comment</Td>
                <Td isNumeric>
                  <ButtonGroup size="sm" variant="ghost">
                    <Button colorScheme="red">Unflag</Button>
                    <Button colorScheme="teal">Remove</Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Box p="12px"></Box>
        <Heading as="h4" size="md">
          Integration
        </Heading>
        <Divider />
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
          <Code>wakak</Code>
        </Box>
      </VStack>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const board = await prisma.board.findUnique({
    where: {
      id: parseInt(params?.id),
    },
  });
  return {
    props: {
      board: JSON.parse(JSON.stringify(board)),
    },
  };
}
