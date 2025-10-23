import { getSessionUser } from "@/utils/getSessionUser";
import Notification from "@/models/notification";
import Post from "@/models/post";          // ✅ add this
import Comment from "@/models/comment";    // ✅ add this if you populate comments
import connectDB from "@/connectDB/database";

export const dynamic = "force-dynamic"; //Prevents to statically pre-render the page.

export async function GET(req) {
  try {
    await connectDB();
  const session = await getSessionUser();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const notifications = await Notification.find({
    recipient: session.user.id,
    isRead: false,
  })
    .lean() // Convert to plain JavaScript objects
    .populate("post")
    .populate("comment")
    .populate("sender", "username name avatar")
    .sort({ createdAt: -1 })
    

  console.log("Notifications fetched:", JSON.stringify(notifications, null, 2)  );

  return new Response(JSON.stringify({ notifications }), { status: 200 });
  } catch (error) {
    console.error("Notification fetch error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }),{ status: 500 });
  }
  
}
