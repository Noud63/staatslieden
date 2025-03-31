import connectDB from "@/connectDB/database";
import { extractPublicId } from "cloudinary-build-url";
import Post from "@/models/post";
import Comment from "@/models/comment";
import Like from "@/models/like";
import { deleteImageFromCloudinary } from "@/utils/deleteImageFromCloudinary";
import { getSessionUser } from "@/utils/getSessionUser";

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { postId } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user?.id || !postId) {
      return new Response(
        JSON.stringify({ message: "You are not authorized to delete a post!" }),
        { status: 401 },
      );
    }

    const post = await Post.findById({ _id: postId });
    const image = post.images[0];
    if (image) {
      const imageToDelete = image;
      const publicId = extractPublicId(imageToDelete);
      const result = await deleteImageFromCloudinary(publicId);
      console.log(result);
    }

    // Delete post
    const deletedPost = await Post.findOneAndDelete({ _id: postId });
    if (!deletedPost) {
  return new Response(
    JSON.stringify({ message: "Post not found or already deleted!" }),
    { status: 404 }
  );
}
    // find all comments
    const comments = await Comment.find({ postId: postId });
    // delete comment likes
    if (comments.length > 0) {
      for (let comment of comments) {
        await Like.deleteMany({ postId: comment._id });
      }
    }
    // delete post likes
    await Like.deleteMany({ postId: postId });
    // delete all comments
    await Comment.deleteMany({ postId: postId });
    //delete comment likes
    

    console.log("Deleted:", deletedPost)

    return new Response(
      JSON.stringify({ message: "Post deleted successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response({message: "Something went wrong!"}, { status: 500 });
  }
};
