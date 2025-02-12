import connectDB from "@/connectDB/database";
import Comment from "@/models/comment";
import Like from "@/models/like";
import { getSessionUser } from "@/utils/getSessionUser";

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { commentId } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user?.id) {
      return new Response(
        JSON.stringify({
          message: "You are not authorized to delete a comment!",
        }),
        { status: 401 },
      );
    }

    // Delete post
    await Comment.findOneAndDelete({ _id: commentId });

    // delete comment likes
    const deletedLikes = await Like.deleteMany({ postId: commentId });
    console.log("Deleted:", deletedLikes);
    return new Response(
      JSON.stringify({ message: "Comment deleted successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
