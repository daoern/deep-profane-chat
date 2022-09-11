import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //   print(`email ${email}`);
      try {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
          },
        });
      } catch (e) {
        if (e.code === "P2002") {
          //duplicated email
          return true;
        }
      }
      return true;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        path: "/",
        sameSite: "none",
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
    },
  },
});
