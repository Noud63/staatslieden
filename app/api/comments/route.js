import connectDB from "@/connectDB/database";
import Comment from "@/models/comment";
import { getSessionUser } from "@/utils/getSessionUser";
import Avatar from "@/models/avatar";

export const POST = async (request) => {
  try {
    await connectDB();

    const { userId, postId, comment, username } = await request.json();

    const sessionUser = await getSessionUser();

    const user = sessionUser?.user;

    if (!sessionUser || !user) {
      return new Response(
        JSON.stringify({
          message: "You must be logged in to post a comment!",
        }),
        { status: 401 },
      );
    }

    const newPost = new Comment({
      postId,
      userId,
      comment,
      username,
    });

    const post = await newPost.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 },
    );
  }
};

export const PATCH =  async (request) => {
  if (request.method !== "PATCH") {
     return new Response({ message: "Method Not Allowed" });
  }

  try {
 await connectDB();

    const { commentId, userId, username, reactionComment } = await request.json();

    if (!commentId || !userId || !reactionComment) {
       return new Response({ message: "Missing required fields" }, { status: 400 });
    }

    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
       return new Response({ message: "Comment not found" }, { status: 404 });
    }

    const avatar = await Avatar.findOne({ userId }); 

    // Create the new reaction object
    const newReaction = {
      userId,
      username,
      comment: reactionComment,
      reactedAt: new Date(),
      avatar: avatar?.avatar,
    };

    // Push the new reaction to the `reactions` array
    comment.reactions.push(newReaction);

    // Save the updated comment
    await comment.save();

    // console.log("Comment:", comment);

    return new Response(JSON.stringify(comment),{ message: "Comment not found" }, { status: 200 });
  } catch (error) {
    console.error("Error adding reaction:", error);
     return new Response({ message: "Internal server error" }, { status: 500 });
  }
}