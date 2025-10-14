import { NextResponse } from "next/server";
import connectDB from "@/connectDB/database";
import { getSessionUser } from "@/utils/getSessionUser";
import mongoose from "mongoose";
import Post from "@/models/post";
import Comment from "@/models/comment";
import PostLike from "@/models/postLikes";
import Avatar from "@/models/avatar";
import { postWithComments } from "@/utils/getPostWithComments";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { postId } = params;
    const sessionUser = await getSessionUser();
    const currentUserId = sessionUser?.user?.id;

    // Find the single post
    const post = await Post.findById(postId).lean();
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const postComments = await postWithComments(post, currentUserId);

    return NextResponse.json(postComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching post", error },
      { status: 500 }
    );
  }
}
