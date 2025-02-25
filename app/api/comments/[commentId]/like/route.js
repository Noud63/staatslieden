import connectDB from "@/connectDB/database";
import Like from "@/models/like";
import Comment from "@/models/comment";
import { getSessionUser } from "@/utils/getSessionUser";

export const POST = async (request, { params }) => {
  
 const { commentId } = params;
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
     if (!comment) {
       return res.status(404).json({ message: "Comment not found" });
     }

     // Check if the user has already liked the comment
     const existingLike = await Like.findOne({ commentId, userId });

     if (existingLike) {
       // User has already liked the comment, so unlike it
       await Like.deleteOne({ _id: existingLike._id });
       comment.likesCount -= 1; // Decrement likesCount
     } else {
       // User has not liked the comment, so like it
       const newLike = new Like({ commentId, userId });
       await newLike.save();
       comment.likesCount += 1; // Increment likesCount
     }

     await comment.save();
     return new Response(comment, { status: 200 });
   } catch (error) {
     return new Response({ message: error.message }, { status: 500 });
   }
};
