import connectDB from "@/connectDB/database";
import CommentLike from "@/models/commentLikes";
import Comment from "@/models/comment";
import { getSessionUser } from "@/utils/getSessionUser";

export const POST = async (request, { params }) => {

  // Extract commentId from the request parameters
  const { commentId, postId} = await request.json();

  if (!commentId) {
    return new Response(
      JSON.stringify({ message: "postId and commentId required" }),
      { status: 400 },
    );
  }
  
//  const { commentId } = params;
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
     console.log("Comment:", comment); 
     if (!comment) {
       return res.status(404).json({ message: "Comment not found" });
     }

     // Check if the user has already liked the comment
     const existingLike = await CommentLike.findOne({ commentId, userId });

     if (existingLike) {
       // User has already liked the comment, so unlike it
       await CommentLike.deleteOne({ _id: existingLike._id });
       comment.likesCount -= 1; // Decrement likesCount
     } 
              
     if(!existingLike){
       // User has not liked the comment, so like it
       const newLike = await CommentLike.create({ commentId, userId, postId});
       await newLike.save();
       comment.likesCount += 1; // Increment likesCount
     }

     await comment.save();
     return new Response(JSON.stringify(comment), { status: 200 });
   } catch (error) {
     return new Response(JSON.stringify({ message: error.message }), { status: 500 });
   }
};
