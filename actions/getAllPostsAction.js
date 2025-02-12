// "use server";
// import connectDB from "@/connectDB/database";
// import Post from "@/models/post";
// import Comment from "@/models/comment";
// import { revalidatePath } from "next/cache";

// const fetchData = async () => {
//   try {
//     // await connectDB();

//     // Fetch posts and populate user info for each post (user's profile picture and username)
//     const posts = await Post.find({})
//       .populate("user", "avatar") // Populate user data (username, profilePicture)
//       .sort({ createdAt: -1 })
//       .lean();

//     // Fetch comments and populate user info for each comment
//     for (const post of posts) {
//       const pc = (post.comments = await Comment.find({ postId: post._id })
//         .populate("userId", "avatar") // Populate user data in comments
//         .lean());
//       //  console.log("Postscomments:", pc);
//     }

//     return JSON.parse(JSON.stringify(posts));
 
//   } catch (error) {
//     console.log(error);
//   }
// };

// export {fetchData}