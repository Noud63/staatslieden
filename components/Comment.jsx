"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { mutate } from "swr";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PostCommentOnCommentForm from "./PostCommentOnCommentForm";


const Comment = ({ com, postId }) => {
  
  const { data: session } = useSession();

  const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//   mutate("/api/posts");  // Force refresh of comments when app is opened
// }, []);

  const toggleLike = async (commentId) => {
    // Optimistically update the UI
    mutate(
      `/api/posts`,
      async (currentData) => {
        // Find the post that contains the comment
        const updatedPosts = currentData.map((post) => {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === commentId) {
                return {
                  ...comment,
                  likesCount:
                    comment.likesCount + (comment.likedByUser ? -1 : 1), // if likedbyuser is true -> comment.likesCount - 1 else comment.likesCount + 1
                  likedByUser: !comment.likedByUser, // Toggle like state true/false
                };
              }
              return comment;
            }),
          };
        });

        try {
          const res = await fetch(`/api/comments/${commentId}/like`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ commentId }),
          });

          if (!res.ok) throw new Error("Failed to update like");
          // mutate("/api/posts");
        } catch (error) {
          console.error(error);
          return currentData; // Rollback on failure
        }

        return updatedPosts; // Return updated UI state
      },
      false,
    ); // `false` means it won't revalidate immediately
  // mutate("/api/posts");
  };

  const deleteComment = async (commentId) => {
    // Optimistically update the UI
    mutate(
      `/api/posts`,
      async (currentData) => {
        // Find the post that contains the comment
        const updatedPosts = currentData.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.filter((comment) => {
                return comment._id !== commentId;
              }),
            };
          }
          return post;
        });

        try {
          const res = await fetch(`/api/deleteComment/${commentId}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if (res.ok) {
            console.log(data.message);
          }
        } catch (error) {
          console.log(data.message);
          return currentData;
        }

        return updatedPosts; // Return updated UI state
      },
      false,
    ); // `false` means it won't revalidate immediately
  };


  const commentOnComment = () => {
       setShowForm(!showForm)
  }


  return (
    <div className="flex h-auto w-full gap-2 px-4 max-xxsm:px-2">
      <div className="flex h-[45px] w-[45px] overflow-hidden rounded-full max-xxsm:h-[40px] max-xxsm:w-[40px]">
        <Image
          src={
            com.userId?.avatar
              ? com.userId.avatar
              : "/images/defaultAvatar2.png"
          }
          alt="icon"
          width={45}
          height={45}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full flex-1 flex-col">
        <div className="mb-1 flex flex-1 flex-col rounded-xl bg-gray-100 p-2">
          <span className="text-sm font-semibold text-gray-800">
            {com.username}
          </span>
          <span>{com.comment}</span>
        </div>

        <div className="flex flex-row justify-between pr-2 text-[11px] font-normal text-gray-500">
          <span className="pl-2 pt-[5px]">
            {`${new Date(com.createdAt).toLocaleDateString()}`}
          </span>
          <div className="flex flex-row gap-2">
            {com.userId._id === session?.user?.id && (
              <button
                type="button"
                className="cursor-pointer text-[12px] font-semibold text-gray-600"
                onClick={() => deleteComment(com._id)}
              >
                verwijder
              </button>
            )}

            {session?.user?.id && (
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
              onClick={() => toggleLike(com._id)}
              disabled={!session}
            >
              {com.likedByUser ? (
                <div className="flex items-center gap-2">
                  <FaHeart color="#ca8a04" size={17} />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegHeart size={17} color="#ca8a04" />
                </div>
              )}{" "}
              {com.likesCount}
            </button>
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <div className="border-red flex w-[90%]">
            {showForm && <PostCommentOnCommentForm commentId={com._id} postId={postId} setShowForm={setShowForm} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
