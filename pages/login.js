import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  useEffect(() => {
    if (!loading && !session) signIn("google");
    if (!loading && session) window.close();
  }, [session, loading]);

  return null;
}
