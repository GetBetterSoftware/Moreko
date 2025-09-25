import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },

  pages:{
    signIn: "/login",
    signOut: "/",
  }
});
export { handler as GET, handler as POST };
