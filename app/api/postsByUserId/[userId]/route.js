import connectDB from "@/connectDB/database";
import Post from "@/models/post";
import Comment from "@/models/comment";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { userId } = params;

    if (!userId) {
      return null;
    }

    // Fetch posts and populate user info for each post (user's profile picture and username)
    const posts = await Post.find({ user: userId })
      .populate("user", "avatar") // Populate user info (profilePicture)
      .sort({ createdAt: -1 })
      .lean();

    // Fetch comments and populate user info for each comment
    for (const post of posts) {
      const pc = (post.comments = await Comment.find({ postId: post._id })
        .populate("userId", "avatar") // Populate user info in comments
        .lean());
    }

    return new Response(JSON.stringify({ posts }), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
