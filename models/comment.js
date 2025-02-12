const { Schema, model, models } = require("mongoose");

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
    },
    username: {
      type: String,
    },
    likesCount: {
      type: Number,
      default: 0, // Tracks the total number of "true" reactions (likes) for the comment
    },
    reactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who reacted
        comment: { type: String, required: true }, 
        reactedAt: {
          type: Date,
          default: Date.now,
        }, // Timestamp of reaction
        avatar: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);


const Comment = models.Comment || model("Comments", CommentSchema);

export default Comment;
