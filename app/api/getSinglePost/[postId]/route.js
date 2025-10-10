import Comment from "@/models/comment";
import Post from "@/models/post";
import connectDB from "@/connectDB/database";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { postId } = params;

    // Get all comments for this post
    const allComments = await Comment.find({ postId })
      .populate("userId", "username name avatar");

    // Helper function to build comment tree
    const buildCommentTree = (parentId = null) => {
      const comments = allComments.filter(comment => 
        parentId === null 
          ? !comment.parentId 
          : comment.parentId?.toString() === parentId.toString()
      );

      return comments.map(comment => ({
        ...comment.toObject(),
        replies: buildCommentTree(comment._id)
      }));
    };

    // Get the post data
    const post = await Post.findById(postId)
      .populate("userId", "username name avatar");

    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), { 
        status: 404 
      });
    }

    // Build complete comment tree
    const commentTree = buildCommentTree();

    // Combine post with organized comments
    const postWithComments = {
      ...post.toObject(),
      comments: commentTree
    };

    console.log("Post with comments:", JSON.stringify(postWithComments, null, 2));

    return new Response(JSON.stringify(postWithComments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { 
      status: 500 
    });
  }
}