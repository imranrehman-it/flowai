import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',  // A custom sign-in page
    // Add more custom pages if needed
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
    
      return baseUrl;
    },
  },
}
export default NextAuth(authOptions)