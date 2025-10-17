// hooks/usePostActions.js

import { mutate } from "swr";
import {
  optimisticPostLikeUpdate,
  optimisticPostLikeUpdateSinglePost,
  optimisticCommentLikeUpdate,
  optimisticCommentLikeUpdateSinglePost,
  optimisticDeleteComment,
  optimisticDeleteCommentSinglePost,
  optimisticDeletePost,
  optimisticDeleteSinglePost
} from "@/utils/optimisticUpdate";

export function usePostActions(postOrPosts) {
  // Determine if we are dealing with a single post or an array
  const isArray = Array.isArray(postOrPosts);

  const getPostId = (post) => post._id;

  // ----------------------
  // LIKE POST
  // ----------------------
  const likePost = async (post) => {
    const postId = getPostId(post);

    // Optimistic update
      mutate(`/api/getSinglePost/${postId}`, optimisticPostLikeUpdateSinglePost(postId), false);
      mutate("/api/getposts", optimisticPostLikeUpdate(postId), false);
      mutate(`/api/getposts/postsByUserId/${post.userId}`, optimisticPostLikeUpdate(postId), false);
    

    // Server request
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });
    if (!res.ok) throw new Error("Failed to like post");

    // Revalidate
    
      await Promise.all([
        mutate("/api/getposts"),
        mutate(`/api/getposts/postsByUserId/${post.userId}`),
        mutate(`/api/getSinglePost/${postId}`)
      ])
    
    
  };

  // ----------------------
  // LIKE COMMENT
  // ----------------------
  const likeComment = async (commentId, post) => {
    const postId = getPostId(post);

      mutate("/api/getposts", optimisticCommentLikeUpdate(commentId), false);
      mutate(`/api/getposts/postsByUserId/${post.userId}`, optimisticCommentLikeUpdate(commentId), false);
      mutate(`/api/getSinglePost/${postId}`, optimisticCommentLikeUpdateSinglePost(commentId), false);

      const res = await fetch(`/api/comments/${commentId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, postId }),
    });

    if (!res.ok) throw new Error("Failed to like comment");

    // Revalidate
    
      await Promise.all([
        mutate("/api/getposts"),
        mutate(`/api/getposts/postsByUserId/${post.userId}`),
        mutate(`/api/getSinglePost/${postId}`)
      ])
  };

  // ----------------------
  // DELETE COMMENT
  // ----------------------
  const deleteComment = async (commentId, post) => {
    const postId = getPostId(post);

      mutate("/api/getposts", optimisticDeleteComment(postId, commentId), false);
      mutate(`/api/getposts/postsByUserId/${post.userId}`, optimisticDeleteComment(postId, commentId), false);
      mutate(`/api/getSinglePost/${postId}`, optimisticDeleteCommentSinglePost(commentId), false);


    const res = await fetch(`/api/deleteComment/${commentId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete comment");


      await Promise.all([
        mutate("/api/getposts"),
        mutate(`/api/getposts/postsByUserId/${post.userId}`),
        mutate(`/api/getSinglePost/${postId}`)
      ]);
};

 const addComment = (post, postId, tempComment) => {
    if (!post || !postId) return;

    mutate("/api/getposts", optimisticAddComment(postId, tempComment), false);
    mutate(`/api/getposts/postsByUserId/${post.userId}`, optimisticAddComment(postId, tempComment), false);
    mutate(`/api/getSinglePost/${postId}`, optimisticAddComment(postId, tempComment), false);
  };

const deletePost = async (postId, userId) => {
  try {
    // Optimistic updates
    mutate("/api/getposts", optimisticDeletePost(postId), false);
    mutate(`/api/getposts/postsByUserId/${userId}`, optimisticDeletePost(postId), false);
    mutate(`/api/getSinglePost/${postId}`, optimisticDeleteSinglePost(postId), false);

    // API call
    const res = await fetch(`/api/deletepost/${postId}`, { method: "DELETE" });
    console.log("Res:", res)

    if (!res.ok) throw new Error("Failed to delete post");

    // Revalidate caches
    await Promise.all([
      mutate("/api/getposts"),
      mutate(`/api/getposts/postsByUserId/${userId}`),
      mutate(`/api/getSinglePost/${postId}`),
      mutate(`/api/getNotifications`),
    ]);
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


  return { likePost, likeComment, addComment, deleteComment, deletePost };
}
