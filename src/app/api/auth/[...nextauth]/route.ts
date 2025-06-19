/* eslint-disable new-cap */
import { apiUrl } from "@/util/urls";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(apiUrl + "/user/refresh", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();
  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(apiUrl + "/user/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();

        // If there's an error from the backend, return null to prevent sign-in
        // The error will be handled in the signIn callback
        if (user.error) {
          return null;
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,

      async profile(profile) {
        const { sub: id, name, email, picture: image } = profile;

        const res = await fetch(apiUrl + "/user/google", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            name: name,
            emailVerified: true,
            image: image,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();
        return { ...user, id };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async signIn({ user }) {
      // If user is null (failed authentication), prevent sign-in
      // NextAuth will redirect to the signIn page automatically
      if (!user) {
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      // Check if token has backendTokens before accessing
      if (!token.backendTokens) return token;

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      try {
        return await refreshToken(token);
      } catch (error) {
        console.error("Token refresh failed:", error);
        // Return token without refresh if refresh fails
        return token;
      }
    },

    async session({ token, session }) {
      try {
        if (token.user) {
          session.user = token.user;
        }
        if (token.backendTokens) {
          session.backendTokens = token.backendTokens;
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        // Return the original session if there's an error
        return session;
      }
    },
  },
  // Add debug mode for development to help identify JWT issues
  debug: process.env.NODE_ENV === "development",
  // Add JWT configuration to handle decryption issues
  jwt: {
    // Increase max age to match session
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
