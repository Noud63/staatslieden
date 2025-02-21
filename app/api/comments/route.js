import { NextResponse } from "next/server";
import connectDB from "@/connectDB/database";
import Comment from "@/models/comment";
import { getSessionUser } from "@/utils/getSessionUser";
import Avatar from "@/models/avatar";

export const POST = async (request) => {
 
  try {
    await connectDB();

    const { postId, parentId, userId, comment, username } = await request.json();

    const sessionUser = await getSessionUser();

    const {
      user: { name, email, image, id, avatar },
      
    } = sessionUser;
    console.log("User:", sessionUser.user);

    if (!sessionUser || !sessionUser.user.id) {
      return new Response("Not authorized!", { status: 401 });
    }

    if (!postId) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    const newComment = await Comment.create({
      postId,
      parentId: parentId || null,
      userId,
      username,
      comment,
      avatar: avatar
    });

    console.log("New Comment:", newComment);

    await newComment.save();
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating comment", error },
      { status: 500 },
    );
  }
};
