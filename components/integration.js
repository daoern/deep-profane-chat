import { Box, Code, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/Integration.module.css";

export default function Integration({ board }) {
  function getBoardIntegratedHtml(board) {
    return (
      `<iframe \n` +
      `   frameborder="0" \n` +
      `   height="600" \n` +
      `   referrerpolicy="no-referrer-when-downgrade" \n` +
      `   src="https://deep-profane.herokuapp.com/board/${board.key}" \n` +
      `   width="100%"> \n` +
      `</iframe>`
    );
  }
  return (
    <VStack w="100%" align="left">
      <Text>API Key of this board.</Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <pre className={styles.pre}>
          <div className={styles.code}>{board.key}</div>
        </pre>
      </Box>
      <Text>
        Copy and paste the following HTML into your website to implement
        DeepProfane Chat.
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <pre className={styles.pre}>
          <div className={styles.code}>{getBoardIntegratedHtml(board)}</div>
        </pre>
      </Box>
    </VStack>
  );
}
