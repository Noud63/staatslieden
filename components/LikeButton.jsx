"use client";
import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { mutate } from "swr";
import { optimisticPostLikeUpdate } from "@/utils/optimisticUpdate";

const LikeButton = ({ postId, post }) => {
  const { data: session } = useSession();

  const toggleLike = async () => {
    try {
      // Optimistically update the UI 
      mutate("/api/getposts", optimisticPostLikeUpdate(postId), false);
      mutate(
        `/api/getposts/postsByUserId/${post.userId}`,
        optimisticPostLikeUpdate(postId),
        false,
      );

      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const data = await res.json();

       await mutate("/api/getposts");

      if (!res.ok) throw new Error("Failed to update like");
    } catch (error) {
      console.error("Error toggling like:", error);
    }
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
