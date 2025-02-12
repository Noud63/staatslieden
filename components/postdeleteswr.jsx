// "use client";
// import React, { useState } from "react";
// import { FaThumbsUp } from "react-icons/fa";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { mutate } from "swr";

// const LikeButton = ({ postId, post }) => {
//   const { data: session } = useSession();

// const deleteComment = async(commentId) => {
//   // Optimistically update the UI
//   mutate(
//     `/api/posts`,
//     async (currentData) => {
//       // Find the post that contains the comment
//        const updatedPosts = currentData.map((post) => {
//         if(post._id === postId) {
//          return {
//            ...post,
//            comments: post.comments.filter((comment) => {
//                 return comment._id !== commentId;
//            })
//          };
//         }
//        });

//         try {
//           const res = await fetch(`/api/deleteComment/${commentId}`, {
//             method: "DELETE",
//           });

//           const data = await res.json();

//           if (res.ok) {
//             console.log(data.message);
//           }
//         } catch (error) {
//           console.log(data.message);
//           return currentData
//         }

//       return updatedPosts; // Return updated UI state
//     },
//     false,
//   ); // `false` means it won't revalidate immediately
// };


//   return (
//     <div className="flex items-center justify-center">
//       <button type="button" disabled={!session}>
//         <FaThumbsUp
//           color="gray"
//           size={20}
//           disabled={!session?.user ? true : false}
//           className="mr-2 cursor-pointer"
//           onClick={toggleLike}
//         />
//       </button>
//       <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
//         {post.likesCount}
//       </div>
//     </div>
//   );
// };

// export default LikeButton;
