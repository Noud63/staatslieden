import { getSessionUser } from "@/utils/getSessionUser";
import Notification from "@/models/notification";
import connectDB from "@/connectDB/database";

export async function GET(req) {
  await connectDB();
const session = await getSessionUser();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const notifications = await Notification.find({
    recipient: session.user.id,
    isRead: false,
  }).populate("post")
    .populate("comment")
    .populate("sender", "username name avatar");

  // console.log("Notifications fetched:", notifications);

  return new Response(JSON.stringify({ notifications }), { status: 200 });
}