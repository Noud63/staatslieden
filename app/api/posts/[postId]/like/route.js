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
//  await connectDB();
    const liked = await Like.findOne({ postId, userId });
       if (liked) {
         // If already liked, remove the like
         await Like.findOneAndDelete({ postId, userId });
         const post = await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
         return new Response(JSON.stringify({ message: "dec" }), { status: 200});
       } else {
         // If not liked, create a new like
         await Like.create({ userId, postId });
         const post = await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
         return new Response(
           JSON.stringify({ message: "inc" }), { status: 200 });
       }
  } catch (error) {
    return new Response({message:error.message}, { status: 500 });
  }
};




