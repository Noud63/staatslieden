import connectDB from "@/connectDB/database";
import Comment from "@/models/comment";
import Like from "@/models/like";
import { getSessionUser } from "@/utils/getSessionUser";

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { slug } = params; // slug is an array

    if (!slug || slug.length === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid request. Missing parameters." }),
        { status: 400 },
      );
    }

    const commentId = slug[0]; // First parameter is always the commentId
    const reactionId = slug.length > 1 ? slug[1] : null; // Second (optional) parameter is reactionId

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user?.id) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    if (reactionId) {
      // If reactionId is provided, delete only the reaction inside the comment
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId },
        { $pull: { reactions: { _id: reactionId } } },
        { new: true },
      );

      if (!updatedComment) {
        return new Response(JSON.stringify({ message: "Comment not found!" }), {
          status: 404,
        });
      }

      return new Response(
        JSON.stringify({ message: "Reaction deleted successfully!" }),
        { status: 200 },
      );
    } else {
      // If no reactionId, delete the whole comment and its reactions
      await Comment.findByIdAndDelete(commentId);
      await Like.deleteMany({ postId: commentId });

      return new Response(
        JSON.stringify({ message: "Comment deleted successfully!" }),
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
