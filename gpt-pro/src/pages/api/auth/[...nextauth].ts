import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

import { addUser, getUser } from "@/utilities/db/dbHelpers"
import { getSession } from "next-auth/react"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"


interface AuthenticatedUser {
    id: string;
    name: string;
    email: string; 
}

interface CustomSession extends Session{
  id: string, 
  name: string, 
  data: any,
}


export const authOptions : NextAuthOptions = {
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
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      
      return '/home';
    },

    async signIn(params: {
        //callback runs after user has been authenticated
        user: any;
        account: any;
        profile?: any;
        email?: { verificationRequest?: boolean } | undefined;
        credentials?: any;
        }) { 
        const user = params.user as AuthenticatedUser;
        const userId = user.id
        try{
            const result = await addUser({id: userId, name: user.name, email: user.email})
            const session = await getSession();
            return true

        }catch(error){
            console.log('error signing in user', error)
            return false;
        }
       

    },

     async jwt({token, user}) {
          //jwt callback always runs before session and after signIn callback,
          //any data you attach to user will be obtainable in session
           if (user?.id) {
               token.id = user.id
           }
           if (user?.name) {
               token.userName = user.name;
           }
           return token
        },

    async session({session, token}: {session: Session, token: JWT}) {
        const customSession = session as CustomSession
        customSession.id = token.id 
        const result = await getUser(token.id)
        customSession.name = token.name;
        customSession.data = result
        return customSession;
    }

   
  },
}
export default NextAuth(authOptions)