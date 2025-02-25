import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
    },
    comment: { type: String, required: true },
    likesCount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
const Comment =  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment