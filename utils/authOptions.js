import connectDB from "@/connectDB/database";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
// import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour - refresh session hourly
  },

  jwt: {
    secret: process.env.AUTH_SECRET,
    maxAge: 60 * 60 * 24, // 24 hours
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax", // "strict" if using OAuth providers
        path: "/",
        secure: true, //in production >  process.env.NODE_ENV === "production"
      },
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          // Basic email validation. For production applications, use email validation libraries like:validator.js
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(credentials.email)) {
            return null;
          }

          await connectDB();

          const dbUser = await User.findOne({
            email: credentials.email.toLowerCase(),
          }).select("+password"); // Ensure password is selected if excluded by default

          if (!dbUser || !dbUser.password) {
            // return null for security, don't reveal whether user exists
            return null;
          }

          const match = await bcrypt.compare(
            credentials.password,
            dbUser.password,
          );
          if (!match) {
            // return null for security
            return null;
          }

          // console.log("User:", dbUser);

          //Do not return the whole dbUser object including password!
          //This is the user object that will be saved in the JWT token

          return {
            id: dbUser._id.toString(),
            name: dbUser.name,
            username: dbUser.username,
            email: dbUser.email,
            avatar: dbUser.avatar,
          };
        } catch (error) {
          console.error("Auth error:", error); // Log on server only
          return null;
        }
      },
    }),
  ],

  callbacks: {
    //Invoked on successful signin
    async signIn({ user, profile, account }) {
      if (account.provider === "google") {
        // console.log("Google profile:", profile);
        // console.log("User:", user);

        await connectDB();

        // Find the user in your DB
        const dbUser = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create it
        if (!dbUser) {
          const newUser = await User.create({
            email: profile.email,
            username: profile.given_name,
            name: profile.name
          });
          return {
            id: newUser._id.toString(),
            name: newUser.name,
            username: newUser.username,
            email: newUser.email
          };
        } else {
          return {
            id: user.id.toString(),
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          };
        }
      }

      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.username = user.username;
        token.id = user.id;
        token.avatar = user.avatar;
      }
      if (trigger === "update" && session?.user) {
        token.avatar = session.user.avatar;
      }

      return token;
    },

    //Modify the session object
    async session({ session, token }) {
      //  NextAuth automatically includes the name property in the session if it exists on the user object
      // Assign user id to the session
      session.user.id = token.id;
      // Assign username to the session
      session.user.username = token.username;
      // Assign avatar to the session
      session.user.avatar = token.avatar;
      // console.log("Session:", session);
      return session;
    },
  },
};
