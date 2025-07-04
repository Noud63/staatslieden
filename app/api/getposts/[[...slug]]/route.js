import { NextResponse } from "next/server";
import connectDB from "@/connectDB/database";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/utils/getSessionUser";
import mongoose from "mongoose";
import Post from "@/models/post";
import Comment from "@/models/comment";
import PostLike from "@/models/postLikes";
import Avatar from "@/models/avatar";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    const currentUserId = sessionUser?.user?.id;

    const userIdFilter = params?.slug?.[1]; // optional userId from URL

    console.log("UserId:", userIdFilter); 

    // Fetch posts filtered by userId if provided
    const query = userIdFilter ? {userId: userIdFilter } : {};

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .lean();

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.aggregate([
          { $match: { postId: post._id } },
          // (your comment aggregation pipeline here, unchanged)
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
                $in: [
                  new mongoose.mongo.ObjectId(currentUserId),
                  "$likes.userId",
                ],
              },
            },
          },
          { $sort: { createdAt: -1 } },
        ]);

        const postLike = await PostLike.findOne({
          postId: post._id,
          userId: currentUserId,
        }).lean();

        const postAvatar = await Avatar.findOne({ userId: post.userId }).select(
          "avatar",
        );

        return {
          ...post,
          avatar: postAvatar ? postAvatar.avatar : null,
          comments: comments.length > 0 ? comments : [],
          likedByUser: !!postLike,
        };
      }),
    );

    return NextResponse.json(postsWithComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching posts", error },
      { status: 500 },
    );
  }
}