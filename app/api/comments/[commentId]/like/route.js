import connectDB from "@/connectDB/database";
import Like from "@/models/like";
import Comment from "@/models/comment";
import { getSessionUser } from "@/utils/getSessionUser";

export const POST = async (request, { params }) => {
  
 const { commentId, postId } = await request.json()
  const session = await getSessionUser();
        await connectDB();

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = session.user.id;

// Add or remove like from database and update the likesCount in the comment
   try {
     const comment = await Comment.findById(commentId);

    //  await Like.collection.dropIndex("userId_1_postId_1");
     if (!comment) {
       return new Response(JSON.stringify({ message: "Comment not found" }), { status: 404 });
     }

     // Check if the user has already liked the comment
     const existingLike = await Like.findOne({ commentId, userId });

     if (existingLike) {
       // User has already liked the comment, so unlike it
       await Like.deleteOne({ _id: existingLike._id });
      // Decrement likesCount atomically in the database
      await Comment.findOneAndUpdate(
        { _id: commentId },
        { $inc: { likesCount: -1 } }
      );
    } else {
      // User has not liked the comment, so like it
      await Like.create({ commentId, userId });

      // Increment likesCount atomically in the database
      await Comment.findOneAndUpdate(
        { _id: commentId },
        { $inc: { likesCount: 1 } }
      );
      }

     return new Response(comment, { status: 200 });
   } catch (error) {
     return new Response(JSON.stringify({ message: error.message }), { status: 500 });
   }
};
