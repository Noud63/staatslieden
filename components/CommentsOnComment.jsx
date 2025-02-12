"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { mutate } from "swr";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CommentsOnComment = ({com, userId, postId}) => {

  const { data: session } = useSession();

  const reactions = com?.reactions.sort((a, b) =>
    b.reactedAt.localeCompare(a.reactedAt)
  );

  const deleteComment = async (commentId, reactionId) => {
    // Optimistically update the UI
    mutate(
      `/api/posts`,
      async (currentData) => {
        console.log("Mutate function running. Current data:", currentData);
        // Find the post that contains the comment
        const updatedComment = currentData.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.map((comment) => {
                //Find the comment that contains the reaction
                if(comment._id === commentId){
                  return {
                    ...comment,
                    reactions: comment.reactions.filter((reaction) => {
                      return reaction._id !== reactionId
                    }
                    ),
                  };
                }
                return comment;
              }),
            };
          }
          return post;
        });

        console.log("Updated posts (optimistic update):", updatedComment);

        try {
          const res = await fetch(`/api/deleteCommentOnComment/${commentId}/${reactionId}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if(res.ok){
           return updatedComment;
          }
           
          if (!res.ok) {
             console.error("Error deleting reaction:", data.message);
             return currentData;
          }
        } catch (error) {
         console.error("Failed to delete reaction:", error);
         // Revert to the previous state if the fetch fails
         return currentData;
        }

      return updatedComment;
      }, false
    ); // `false` means it won't revalidate immediately
  };
 
    return (
      <div className="flex h-auto w-full flex-col items-end gap-2 px-4 max-xxsm:px-2">
        {reactions &&
          reactions.map((reaction, index) => (
            <div key={index} className="flex w-full max-w-[100%] gap-2 pl-14">
              <div className="flex h-[40px] w-[40px] overflow-hidden rounded-full max-xxsm:h-[40px] max-xxsm:w-[40px]">
                <Image
                  src={
                    reaction?.avatar
                      ? reaction.avatar
                      : "/images/defaultAvatar2.png"
                  }
                  alt="icon"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex w-full flex-1 flex-col">
                <div className="mb-1 flex w-full flex-1 flex-col rounded-xl bg-gray-100 p-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {reaction.username}
                  </span>
                  <span>{reaction.comment}</span>
                </div>

                <div className="flex flex-row justify-between pr-2 text-[11px] font-normal text-gray-500">
                  <span className="pl-2 pt-[5px]">
                    {`${new Date(reaction.reactedAt).toLocaleDateString()}`}
                  </span>
                  <div className="flex flex-row gap-2">
                    {reaction.userId === userId && (
                      <button
                        type="button"
                        className="cursor-pointer text-[12px] font-semibold text-gray-600"
                        onClick={() => deleteComment(com._id, reaction._id)}
                      >
                        verwijder
                      </button>
                    )}

                    {session?.user && (
                      <button
                        type="button"
                        className="cursor-pointer text-[12px] font-semibold text-gray-600"
                        onClick={() => commentOnComment(com._id, postId)}
                      >
                        reageer
                      </button>
                    )}

                    <button
                      type="button"
                      className="flex w-[50px] cursor-pointer items-center justify-center gap-3 rounded-full border border-gray-400 text-[14px] font-semibold text-gray-600"
                      onClick={() => toggleLike(reaction._id)}
                      disabled={!userId}
                    >
                      {reaction.likedByUser ? (
                        <div className="flex items-center gap-2">
                          <FaHeart color="#ca8a04" size={17} />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <FaRegHeart size={17} color="#ca8a04" />
                        </div>
                      )}{" "}
                      {reaction.likesCount}0
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
}

export default CommentsOnComment;