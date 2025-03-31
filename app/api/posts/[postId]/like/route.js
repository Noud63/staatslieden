import connectDB from "@/connectDB/database";
import Post from "@/models/post";
import Like from "@/models/like";
import { getSessionUser } from "@/utils/getSessionUser";

export const POST = async (request, { params }) => {
 
  const { postId } = params;
  const session = await getSessionUser()

  if (!session) {
    return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 });
  }

  const userId = session.user.id;

  try {
 await connectDB();

    const liked = await Like.findOne({ postId, userId });

    let updatedLikesCount;
    
       if (liked) {
         // If already liked, remove the like
         await Like.findOneAndDelete({ postId, userId });
         const post = await Post.findByIdAndUpdate(postId, { $inc: { likesCount: liked ? -1 : 1 } },{ new: true }) // Return updated document);
         updatedLikesCount = post?.likesCount ?? 0;
       } else {
         // If not liked, create a new like
         await Like.create({ userId, postId });
         const post = await Post.findByIdAndUpdate(postId,{ $inc: { likesCount: liked ? -1 : 1 } },{ new: true });
          updatedLikesCount = post?.likesCount ?? 0;
       }

        return new Response(
          JSON.stringify({ likesCount: updatedLikesCount, liked: !liked }),
          {
            status: 200,
          },
        );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};




