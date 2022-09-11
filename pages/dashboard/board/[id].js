import { CheckCircleIcon, UpDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Integration from "../../../components/integration";
import Layout from "../../../components/layout";
import Moderation from "../../../components/moderation";
import Overview from "../../../components/overview";
import prisma from "../../../lib/prisma";

export default function BoardAdmin({ board, commentCount, flaggedComments }) {
  const {
    isOpen: isInstallOpen,
    onOpen: onInstallOpen,
    onClose: onInstallClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBoard = async () => {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    try {
      const body = {
        boardId: board.id,
      };
      const response = await fetch("/api/board/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.href = `/dashboard`;
    } catch (error) {
      console.error(error);
    }
    setIsDeleting(false);
  };

  return (
    <Layout>
      <VStack w="100%" align="left">
        <Flex alignItems="center">
          <Heading as="h3" size="lg" my="24px">
            {board.name}
          </Heading>
          <Spacer />
          <Button colorScheme="teal" onClick={onInstallOpen}>
            Install
          </Button>
          <Menu>
            <MenuButton
              _active={{ bg: "transparent" }}
              _hover={{ bg: "transparent" }}
              _expanded={{ bg: "transparent" }}
              background="transparent"
              as={Button}
              rightIcon={<UpDownIcon />}
            ></MenuButton>
            <MenuList>
              <MenuItem onClick={onDeleteOpen}>Delete board</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {}

        <Tabs isLazy>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Moderation</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Overview board={board} commentCount={commentCount} />
            </TabPanel>
            <TabPanel>
              <Moderation flaggedComments={flaggedComments} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Modal isOpen={isInstallOpen} onClose={onInstallClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Integration</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Integration board={board} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onInstallClose}>
                Close
              </Button>
              <Button variant="ghost">Copy HTML</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Board
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can&#39;t undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={deleteBoard}
                  ml={3}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
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
