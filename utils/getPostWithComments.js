import mongoose from "mongoose";
import Comment from "@/models/comment";
import PostLike from "@/models/postLikes";
import Avatar from "@/models/avatar";

export async function postWithComments(post, currentUserId, avatarMap) {
  if (!post) return null;

  // Fetch comments with aggregation pipeline
  const comments = await Comment.aggregate([
    { $match: { postId: new mongoose.Types.ObjectId(post._id) } },
    {
      $lookup: {
        from: "avatars",
        localField: "userId",
        foreignField: "userId",
        as: "avatar",
      },
    },
    {
      $addFields: {
        avatar: { $arrayElemAt: ["$avatar.avatar", 0] },
      },
    },
    {
      $graphLookup: {
        from: "comments",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentId",
        as: "replies",
        maxDepth: 5,
      },
    },
    {
      $lookup: {
        from: "avatars",
        localField: "replies.userId",
        foreignField: "userId",
        as: "replyAvatars",
      },
    },
    {
      $addFields: {
        "replies.avatar": { $arrayElemAt: ["$replyAvatars.avatar", 0] },
      },
    },
    {
      $lookup: {
        from: "commentlikes",
        localField: "_id",
        foreignField: "commentId",
        as: "likes",
      },
    },
    {
      $addFields: {
        likedByUser: {
          $in: [new mongoose.mongo.ObjectId(currentUserId), "$likes.userId"],
        },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  // Post like check
  const postLike = await PostLike.findOne({
    postId: post._id,
    userId: currentUserId,
  }).lean();

  // Post avatar
  //const postAvatar = await Avatar.findOne({ userId: post.userId }).select("avatar");
  const postAvatar = avatarMap[post.userId.toString()] || null;

  return {
    ...post,
    avatar: postAvatar,
    comments: comments.length > 0 ? comments : [],
    likedByUser: !!postLike,
  };
}
