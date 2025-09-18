import connectDB from "@/connectDB/database";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
// import Register from "@/models/Register";
// import profileDefault from "@/assets/images/profile.png";
import CredentialsProvider from "next-auth/providers/credentials";
// import FacebookProvider from "next-auth/providers/facebook";
// import GithubProvider from "next-auth/providers/github";
// import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";



export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "jwt",
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

    //     FacebookProvider({
    //       clientId: process.env.FACEBOOK_CLIENT_ID,
    //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //       allowDangerousEmailAccountLinking: true,
    //     }),

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
          if (!credentials) return null;
          const foundUser = await User.findOne({
            email: credentials.email,
          });
          if (!foundUser) {
            throw new Error("Invalid credentials");
          }
          const match = await bcrypt.compare(
            credentials.password,
            foundUser.password,
          );
          if (!match) {
            throw new Error("Invalid credentials");
          }
          return foundUser;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],

  callbacks: {
    //Invoked on successful signin
    async signIn({ user, profile, account }) {
      await connectDB();

      if (account.provider === "google" || account.provider === "facebook") {
        // 2. Check if user exists, and if not, add user to database, or update image if social login
        const update = {
          $set: {
            username: profile.name,
            name: profile.name,
            avatar:
              account.provider === "facebook" ? user.image : profile.picture,
          },
        };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await User.findOneAndUpdate({ email: profile.email }, update, options);
      }
      // 4. Return true to allow sign in
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        // token.name = user.name;
        token.username = user.username;
        token.id = user._id;
        token.avatar = user.avatar;
        console.log("Jwt_user:", { user });
      }
      if (trigger === "update") {
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
      console.log("Session:", session);
      return session;
    },
  },
};
