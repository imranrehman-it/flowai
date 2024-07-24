import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

import { addUser, getUser } from "@/utilities/db/dbHelpers";

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
}

interface CustomSession extends Session {
  id: string;
  name: string;
  data: any;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log("Redirect callback:", { url, baseUrl });
      return baseUrl + '/home';
    },

    async signIn({ user, account, profile, email, credentials }: { user: any; account: any; profile?: any; email?: { verificationRequest?: boolean } | undefined; credentials?: any }) {
      console.log("SignIn callback:", { user, account, profile, email, credentials });
      const authenticatedUser = user as AuthenticatedUser;
      const userId = authenticatedUser.id;
      try {
        console.log('Adding user:', authenticatedUser);
        await addUser({ id: userId, name: authenticatedUser.name, email: authenticatedUser.email });
        console.log('User added successfully');
        return true;
      } catch (error) {
        console.error('Error signing in user:', error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT, user?: any }) {
      console.log("JWT callback:", { token, user });
      if (user?.id) {
        token.id = user.id;
      }
      if (user?.name) {
        token.userName = user.name;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback:", { session, token });
      const customSession = session as CustomSession;
      customSession.id = token.id;
      customSession.name = token.userName;
      try {
        const result = await getUser(token.id);
        customSession.data = result;
        return customSession;
      } catch (error) {
        console.error('Error fetching user data:', error);
        return customSession;
      }
    },
  },
};

export default NextAuth(authOptions);
