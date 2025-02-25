
import { Schema, model, models } from "mongoose";

const LikeSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  },
);

// Ensure a user can like a post only once
// LikeSchema.index({ user: 1, post: 1 }, { unique: true });

const Like = models.Likes || model("Likes", LikeSchema);

export default Like