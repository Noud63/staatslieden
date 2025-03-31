
import { Schema, model, models } from "mongoose";

const LikeSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

LikeSchema.index({ userId: 1, postId: 1 }, { unique: true, sparse: true });
LikeSchema.index({ userId: 1, commentId: 1 }, { unique: true, sparse: true });

const Like = models.Like || model("Like", LikeSchema);

export default Like