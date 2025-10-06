import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema({
  recipient: { type:Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["like"], required: true },
  post: { type:Schema.Types.ObjectId, ref: "Post" },
  comment: { type:Schema.Types.ObjectId, ref: "Comment" },
  sender: { type:Schema.Types.ObjectId, ref: "User", required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = models.Notification || model("Notification", notificationSchema);
export default Notification;