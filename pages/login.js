// import { signIn, useSession } from "next-auth/react";
import { Box, Button, Container, Heading, VStack } from "@chakra-ui/react";
import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";

// export default function Login() {
//   const { data: session, status } = useSession();
//   const loading = status === "loading";
//   useEffect(() => {
//     if (!loading && !session) signIn("");
//     if (!loading && session) window.close();
//   }, [session, loading]);

//   return null;
// }

export default function Login({ providers }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const { callbackUrl } = router.query;

  console.log(callbackUrl);
  useEffect(() => {
    if (loading) return;
    if (session) {
      if (callbackUrl == null) {
        window.close();
      } else {
        window.location.href = callbackUrl;
      }
    }
  }, [session, loading]);
  return (
    <Container pt="40">
      <VStack>
        <Image width="64px" height="64px" src="/logo.png" alt="Logo" />
        <Heading as="h3" size="lg" pb="12px">
          DeepProfane Chat
        </Heading>
        <Box minW="sm" borderWidth="1px" borderRadius="lg" p="24px">
          <VStack>
            {Object.values(providers).map((provider) => (
              <Button key={provider.name} onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </Button>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
