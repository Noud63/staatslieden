// import connectDB from "@/connectDB/database";
// import Post from "@/models/post";
// import { getSessionUser } from "@/utils/getSessionUser";

// //Post via Shared URL
// export const GET = async (request, { params }) => {
//   const { postId } = params;
//   const session = await getSessionUser();
//   await connectDB();

//   if (!session) {
//     return new Response(JSON.stringify({ message: "Unauthorized" }), {
//       status: 401,
//     });
//   }

//   try { 
//     const post = await Post.findOne({ _id:postId});
//     if (post) {
     
//       return new Response(JSON.stringify(post), { status: 200 });
//     } else {
    
//       return new Response(JSON.stringify({ message: "Post not found!" }), { status: 404 });
//     }
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error.message }), { status: 500 });
//   }
// }