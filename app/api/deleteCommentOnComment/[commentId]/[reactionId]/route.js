// import connectDB from "@/connectDB/database";
// import Comment from "@/models/comment";
// import { getSessionUser } from "@/utils/getSessionUser";

// export const DELETE = async (request, { params }) => {
  
//   try {
//     await connectDB();

//     const { commentId, reactionId } = params;

//     if (!commentId || !reactionId) {
//       return new Response(
//         JSON.stringify({ message: "Invalid request. Missing parameters." }),
//         { status: 400 },
//       );
//     }

//     const sessionUser = await getSessionUser();
//     if (!sessionUser || !sessionUser.user?.id) {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const updatedComment = await Comment.findOneAndUpdate(
//       { _id: commentId },
//       { $pull: { reactions: { _id: reactionId } } },
//       { new: true },
//     );

//     if (!updatedComment) {
//       return new Response(JSON.stringify({ message: "Comment not found!" }), {
//         status: 404,
//       });
//     }

//     return new Response(
//       JSON.stringify( updatedComment, { message: "Reaction deleted successfully!" }),
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("❌ API Error:", error);
//     return new Response("Something went wrong!", { status: 500 });
//   }
// };
