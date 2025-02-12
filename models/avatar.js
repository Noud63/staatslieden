import { Schema, model, models } from "mongoose";

const AvatarSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can like a post only once
// LikeSchema.index({ user: 1, post: 1 }, { unique: true });

const Avatar = models.Avatar || model("Avatars", AvatarSchema);

export default Avatar;
