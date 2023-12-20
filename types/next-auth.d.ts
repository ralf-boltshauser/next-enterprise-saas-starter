import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
  }

  interface User {
    dbId?: number; // Use the appropriate type for your dbId
  }
}
