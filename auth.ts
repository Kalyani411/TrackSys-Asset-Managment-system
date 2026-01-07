import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  if (!credentials?.username || !credentials?.password) {
    return null;
  }

  console.log("credentials>>>", credentials)

  const user = await prisma.user.findFirst({
  where: {
    OR: [
      { username: credentials.username },
      { email: credentials.username },
    ],
  },
});

console.log("DB USER:", user);

if (!user || !user.password) return null;

const isValid = await bcrypt.compare(
  credentials.password!,
  user.password
);

console.log("PASSWORD VALID:", isValid);

if (!isValid) return null;


  if (!isValid) return null;

  return {
    id: String(user.id),
    name: user.username,
    role: user.role,
  };
}

    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "ADMIN" | "USER";
      return session;
    },
  },
});
