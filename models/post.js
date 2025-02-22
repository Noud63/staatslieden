import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    postContent: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    images: [
      {
        type: String,
      },
    ],
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Post =  mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
