import { useSession, signIn, signOut, getSession } from "next-auth/react";
import React from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../components/layout";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Dashboard({ boards }) {
  return (
    <Layout>
      <Flex>
        <Heading as="h3" size="lg" my="24px">
          My boards
        </Heading>
        <Center>
          <Tag colorScheme="cyan" mx="12px">
            {boards.length}
          </Tag>
        </Center>
        <Spacer />
        <Link href="dashboard/board/new">
          <Button my="24px">Create new</Button>
        </Link>
      </Flex>
      <VStack w="100%" align="left">
        {boards.map((board) => (
          <Link key={board.id} href={`dashboard/board/${board.id}`}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="16px"
            >
              <Heading as="h4" size="md">
                {board.name}
              </Heading>
              <Text>{board.domain}</Text>
              <Button
                float="right"
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="ghost"
              >
                View
              </Button>
            </Box>
          </Link>
        ))}
      </VStack>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var boards = [];
  if (session) {
    boards = await prisma.board.findMany({
      where: {
        ownerEmail: session.user.email,
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });
  }
  return {
    props: {
      boards: JSON.parse(JSON.stringify(boards)),
    },
  };
}
