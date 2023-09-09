import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Firebase from "@/lib/firebase";
const firebase = new Firebase();

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as Record<string, string>; //find user in database
        const user = await firebase.signIn(email, password);
        if (user.status === 200 && user.data) {
          return user.data as any;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      // This callback is invoked when signing in and whenever a session is accessed (if `jwt` session strategy is used).
      if (user) {
        token.ro_id = user.ro_id;
        token.createdAt = user.createdAt;
        token.lastLoggedIn = user.lastLoggedIn;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.ro_id = token.ro_id;
      session.user.createdAt = token.createdAt;
      session.user.lastLoggedIn = token.lastLoggedIn;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
