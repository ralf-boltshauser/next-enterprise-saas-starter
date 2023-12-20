// pages/api/auth/[...nextauth].js
import { setUser } from "@/lib/features/auth/authSlice";
import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ... add more providers if needed
  ],
  // ... other configurations
  pages: {
    signIn: "/auth/login", //
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in

    // ... additional configurations
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google") {
        // Upsert the user into the Teacher table
        const userResponse = await prisma.user.upsert({
          where: { email: user.email! },
          update: {
            name: user.name!,
            email: user.email!,
            image: user.image,
          },
          create: {
            name: user.name!,
            email: user.email!,
            image: user.image,
          },
        });

        user.dbId = userResponse.id;

        setUser(user);
      }

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.dbId = user?.dbId;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      if (session?.user) {
        session.user.id = token.dbId;
      }
      return session;
    },
  },
} as AuthOptions;

const handler = NextAuth(authOptions);

export default handler;
export { handler as DELETE, handler as GET, handler as POST, handler as PUT };
