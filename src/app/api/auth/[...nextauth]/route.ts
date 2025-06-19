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

        try {
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

          // Check if the response is successful
          if (!res.ok) {
            const errorData = await res.json();
            if (process.env.NODE_ENV === "development") {
              console.error("Login API error:", errorData);
            }
            // Return null to trigger NextAuth error handling
            return null;
          }

          const user = await res.json();

          // Validate the response structure
          if (!user || !user.user || !user.backendTokens) {
            if (process.env.NODE_ENV === "development") {
              console.error("Invalid user response structure:", user);
            }
            return null;
          }

          return user;
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Login request failed:", error);
          }
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        try {
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

          if (!res.ok) {
            if (process.env.NODE_ENV === "development") {
              console.error(
                "Google profile API error:",
                res.status,
                res.statusText
              );
            }
            throw new Error(
              `Failed to create/fetch user profile: ${res.status}`
            );
          }

          const user = await res.json();
          return { ...user, id };
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Google profile processing error:", error);
          }
          throw error;
        }
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
      try {
        // If user is null (failed authentication), prevent sign-in
        if (!user) {
          if (process.env.NODE_ENV === "development") {
            console.error("SignIn callback: User is null");
          }
          // Return false to trigger redirect to error page with proper error handling
          return false;
        }

        // Authentication successful - debug mode will handle logging

        return true;
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("SignIn callback error:", error);
        }
        return false;
      }
    },
    async jwt({ token, user }) {
      // On initial sign in, user object contains the backend response
      if (user) {
        // Handle the nested structure from backend (credentials provider)
        const userWithBackend = user as any;
        if (userWithBackend.user && userWithBackend.backendTokens) {
          // This is the structure from credentials provider
          return {
            ...token,
            user: userWithBackend.user,
            backendTokens: userWithBackend.backendTokens,
          };
        } else {
          // This might be from Google provider or other cases
          return { ...token, ...user };
        }
      }

      // Check if token has backendTokens before accessing
      if (!token.backendTokens) return token;

      // Check if token is expired
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      try {
        return await refreshToken(token);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Token refresh failed:", error);
        }
        // Return token without refresh if refresh fails
        return token;
      }
    },

    async session({ token, session }) {
      if (token.user) {
        session.user = token.user;
      }
      if (token.backendTokens) {
        session.backendTokens = token.backendTokens;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
