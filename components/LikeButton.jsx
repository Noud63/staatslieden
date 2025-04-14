"use client";
import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { mutate } from "swr";

const LikeButton = ({ postId, post }) => {
  const { data: session } = useSession();

  const toggleLike = async () => {
    // Optimistically update the UI
    mutate(
      `/api/posts`,
      async (currentData) => {
        // Find the post with the likesCount
        const updatedPosts = currentData.map((p) => {
          if (p._id === postId) {
            return {
              ...p,
              likesCount: p.likesCount + (p.likedByUser ? -1 : 1), // if likedbyuser is true -> comment.likesCount - 1 else comment.likesCount + 1
              likedByUser: !p.likedByUser, // Toggle like state true/false
            };
          }
          return p;
        });

        try {
          const res = await fetch(`/api/posts/${postId}/like`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Failed to update like:", res.status, errorData.message);
          }
        } catch (error) {
          console.error("Error toggling like:", error);
          return currentData;
        }

        return updatedPosts; // Return updated UI state
      },
      false,
    ); // `false` means it won't revalidate immediately
  };

  return (
    <div className="flex items-center justify-center">
      <button type="button" disabled={!session} onClick={toggleLike}>
        <FaThumbsUp
          color="gray"
          size={20}
          disabled={!session?.user ? true : false}
          className="mr-2 cursor-pointer"
        />
      </button>
      <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
        {post.likesCount}
      </div>
    </div>
  );
};

export default LikeButton;
