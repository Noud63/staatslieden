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
        sameSite: 'lax',
        path: '/',
        secure: true //in production >  process.env.NODE_ENV === "production"
      }
    }
  },

  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    //   allowDangerousEmailAccountLinking: true,
    // }),

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
          if (!credentials?.email || !credentials?.password) return null;

          // Basic email validation. For production applications, use email validation libraries like:validator.js
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(credentials.email)) {
            return null;
          }

          await connectDB();

          const foundUser = await User.findOne({
            email: credentials.email.toLowerCase(),
          }).select('+password'); // Ensure password is selected if excluded by default

          if (!foundUser || !foundUser.password) {
            // return null for security, don't reveal whether user exists
            return null; 
          }
          
          const match = await bcrypt.compare(
            credentials.password,
            foundUser.password,
          );
          if (!match) {
            // return null for security
           return null;
          }

          return foundUser

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
  
      token.exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24); //24 hours expiration
      if (user) {
        // token.name = user.name;
        console.log("User:", { user });
        token.username = user.username;
        token.id = user._id;
        token.avatar = user.avatar;
        console.log("Jwt_user:", { user });
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
      console.log("Session:", session);
      return session;
    },
  },
};
