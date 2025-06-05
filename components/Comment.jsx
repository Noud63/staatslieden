"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import threedots from "../assets/icons/threedots.png";
import { mutate } from "swr";
import { useTranslations } from 'next-intl';
import commentIcon from "../assets/icons/comment.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PostCommentForm from "./PostCommentForm";
import EditCommentForm from "./EditCommentForm";
import CommentOptions from "./CommentOptions"; // Assuming you have a separate component for comment options

const Comment = ({ comment, postId, parentId }) => {

  const { data: session } = useSession();

  const t = useTranslations("auth");
  
 const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);

  const userId = session?.user?.id;

  useEffect(()=> {
if(showForm && showOptions) {
  setShowForm(false)
}
},[showForm, showOptions])

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

  return (
    <div className="mb-2 flex h-auto w-full gap-2 px-4 max-xxsm:px-2">
      <div
        className={`${parentId === null ? "h-[40px] w-[40px]" : "h-[30px] w-[30px]"} flex overflow-hidden rounded-full`}
      >
        <Image
          src={comment.avatar ? comment.avatar : "/images/defaultAvatar2.png"}
          alt="icon"
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full flex-1 flex-col">
        <div>
          {showEditComment && (
            <EditCommentForm
              comment={comment}
              setShowEditComment={setShowEditComment}
            />
          )}
        </div>

        {!showEditComment && (
          <div className="flex flex-1 flex-col rounded-xl border-b border-gray-300 bg-yellow-800/10 px-2 pb-2 pt-1 leading-4 shadow-sm">
            <span className="text-sm font-semibold text-gray-800">
              {comment.username}
            </span>
            <span className="text-sm text-gray-800">
              {comment.comment}
            </span>
          </div>
        )}

        <div className="flex flex-row justify-between pr-2 text-[11px] font-normal text-gray-500">
          <span className="pl-2 pt-[8px]">
            {`${new Date(comment.createdAt).toLocaleDateString()}`}
          </span>

          <div className="relative flex flex-row items-center gap-2">
            {userId && (
              <button
                type="button"
                className="cursor-pointer py-2 text-sm text-gray-600"
                onClick={() => setShowForm(!showForm)}
              >
                {t("reageer")}
              </button>
            )}

            <button
              type="button"
              className="mt-1 flex h-[24px] cursor-pointer items-center justify-center gap-1 rounded-full border border-gray-400 px-2 text-[14px] font-semibold text-gray-600"
              onClick={() => toggleLike(comment._id)}
              disabled={!session}
            >
              {comment.likedByUser ? (
                <div className="flex items-center">
                  <FaHeart color="#ca8a04" size={15} />
                </div>
              ) : (
                <div className="flex items-center">
                  <FaRegHeart size={15} color="#ca8a04" />
                </div>
              )}{" "}
              {comment.likesCount}
            </button>

            {session?.user?.id && comment.userId === userId && (
              <div>
                <Image
                  src={threedots}
                  alt=""
                  width={24}
                  height={24}
                  className="mt-1 flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full p-[2px] transition-all duration-500 hover:bg-yellow-800/10"
                  onClick={() => setShowOptions(!showOptions)}
                />
              </div>
            )}

            {showOptions && (
              <CommentOptions
                comment={comment}
                userId={userId}
                setShowOptions={setShowOptions}
                showOptions={showOptions}
                setShowForm={setShowForm}
                showForm={showForm}
                setShowEditComment={setShowEditComment}
                showEditComment={showEditComment}
                deleteComment={deleteComment}
              />
            )}
          </div>
        </div>

        <div>
          {showForm && (
            <PostCommentForm
              postId={comment.postId}
              parentId={comment._id}
              setShowForm={setShowForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
