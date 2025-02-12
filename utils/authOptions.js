
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
  //     EmailProvider({
  //       server: {
  //         host: process.env.EMAIL_SERVER_HOST,
  //         port: process.env.EMAIL_SERVER_PORT,
  //         auth: {
  //           user: process.env.EMAIL_SERVER_USER,
  //           pass: process.env.EMAIL_SERVER_PASSWORD,
  //         },
  //       },
  //       from: process.env.EMAIL_FROM,
  //       maxAge: 60,
  //     }),

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
              throw new Error("Invalid email or password");
            }
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );
            if (!match) {
              throw new Error("Password did not matched");
            }
            return foundUser;
          } catch (error) {
            console.log(error);
          }
          return null;
        },
      }),
     ],


callbacks: {
      //Invoked on successful signin
      async signIn({ user, profile, account }) {
       
        await connectDB();
        
        if (account.provider === "google" || account.provider === "facebook") {
          // 2. Check if user exists
          const userExists = await User.findOne({ email: profile.email });
          // 3. If not, add user to database
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name,
              name: profile.name,
              avatar: profile.picture
            });
          }
          // If user exist add corresponding profile-image (from google or facebook) by updating document image value
          if (userExists) {
            await User.updateOne({ email: userExists.email }, [
              {
                $set: {
                  image: {
                    $cond: {
                      if: account.provider === "facebook",
                      then: user.image,
                      else: profile.picture,
                    },
                  },
                },
              },
            ]);
          }
        }
        // 4. Return true to allow sign in
        return true;
      },
      async jwt({ token, user, account }) {
        if (user) {
          // token.name = user.name;
          token.username = user.username;
        }
        // console.log("Jwt_user:", { user });
        return token;
      },
      //Modify the session object
      async session({ session, token }) {
        // 1. Get user from the database
        const user = await User.findOne({ email: session.user.email });
        // 2. Assign user id to the session
        session.user.id = user._id.toString();
        // 4. Assign username to the session
        session.user.username = token.username;
        // 4. Assign avatar to the session
        session.user.avatar = user.avatar;
        // console.log(session)
        return session;
      },
    },
};
