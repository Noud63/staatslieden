import connectDB from "@/connectDB/database";

import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

connectDB()

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };