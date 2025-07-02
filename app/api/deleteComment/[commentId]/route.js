import connectDB from "@/connectDB/database";
import Comment from "@/models/comment";
import mongoose from "mongoose";
import CommentLike from "@/models/commentLikes";
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

    const nestedComments = await Comment.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(commentId) },
      },
      {
        $graphLookup: {
          from: "comments",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parentId",
          as: "descendants",
        },
      },
    ]);

    // Ensure nestedComments[0] exists
    if (!nestedComments.length) {
      return new Response(JSON.stringify({ message: "Comments not found" }), {
        status: 404,
      });
    }

    const allCommentIds = [
      new mongoose.Types.ObjectId(commentId),
      ...nestedComments[0].descendants.map((c) => c._id),
    ];

    // console.log("Nested Comments:", JSON.stringify(nestedComments, null, 2));
    // console.log("Comment ID's:", JSON.stringify(allCommentIds, null, 2));

    // Delete all comments (including the root and nested)
    await Comment.deleteMany({ _id: { $in: allCommentIds } });
    await CommentLike.deleteMany({ commentId: { $in: allCommentIds } });

    // Delete comment
    await Comment.findOneAndDelete({ _id: commentId });

    // delete comment likes
    await CommentLike.deleteMany({ commentId: commentId });

    return new Response(
      JSON.stringify({ message: "Comment deleted successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
