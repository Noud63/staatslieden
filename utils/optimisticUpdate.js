//higher-order function => a function that returns another function.
//currentData is mutate("api/posts")

const optimisticCommentLikeUpdate = (commentId) => (currentData) => {
  if (!currentData) return currentData;
  // Optimistically update the comment's likes
  return currentData.map((post) => {
    return {
      ...post,
      comments: post.comments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            likesCount: comment.likesCount + (comment.likedByUser ? -1 : 1), // if likedbyuser is true -> comment.likesCount - 1 else comment.likesCount + 1
            likedByUser: !comment.likedByUser, // Toggle like state true/false
          };
        }
        return comment;
      }),
    };
  });
};

const optimisticPostLikeUpdate = (postId) => (currentData) => {
  if (!currentData) return currentData;
  console.log("Current:", currentData);
  // Optimistically update the comment's likes
  return currentData.map((post) => {
    if (post._id === postId) {
      return {
        ...post,
        likesCount: post.likesCount + (post.likedByUser ? -1 : 1), // if likedbyuser is true -> comment.likesCount - 1 else comment.likesCount + 1
        likedByUser: !post.likedByUser, // Toggle like state true/false
      };
    }
    return post;
  });
};

const optimisticDeletePost = (postId) => (currentData) => {
  if (!currentData) return currentData;
  console.log("Current:", currentData);
  // Optimistically delete post
  return currentData.filter((post) => {
    return post._id !== postId;
  });
};

const optimisticDeleteComment = (postId, commentId) => (currentData) => {
  if (!currentData) return currentData;
  // Optimistically delete post
  return currentData.map((post) => {
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
};

export {
  optimisticPostLikeUpdate,
  optimisticCommentLikeUpdate,
  optimisticDeletePost,
  optimisticDeleteComment
};
