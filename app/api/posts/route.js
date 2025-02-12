import connectDB from "@/connectDB/database";
import cloudinary from "@/config/cloudinary";
import Post from "@/models/post";
import Comment from "@/models/comment";
import Like from "@/models/like";
import { getSessionUser } from "@/utils/getSessionUser";

export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user.id) {
      return new Response("User ID is required", { status: 401 });
    }

    const {
      user: { name, email, image, id, username, avatar },
      userId,
    } = sessionUser;
    // console.log("User:", sessionUser)

    const content = formData.get("postContent");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== ""); //prevent error cloudinary

    const postData = {
      postContent: content,
      user: userId,
      username: username,
      name: name,
      images,
    };

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      //Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "nextjs_blog" },
      );

      imageUploadPromises.push(result.secure_url);

      //Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      //Add uploaded images to the post
      postData.images = uploadedImages;
    }

    // console.log("Post:", postData);

    const newPost = new Post(postData);
    await newPost.save();

    // console.log(newPost)

    return new Response(JSON.stringify(newPost, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new Response("Failed to add post", { status: 500 });
  }
};

export const GET = async (request) => {
  const sessionUser = await getSessionUser();

  try {
    await connectDB();

    // Fetch posts and populate user info for each post (user's profile picture and username)
    const posts = await Post.find({})
      .populate("user", "avatar") // Populate user data (username, profilePicture)
      .sort({ createdAt: -1 })
      .lean();

    // Fetch comments and populate user info for each comment
    for (const post of posts) {
      const pc = (post.comments = await Comment.find({ postId: post._id })
        .populate("userId", "avatar") // Populate user data in comments
        .lean());

      const liked = await Like.findOne({
        // If there is a liked post, it will return true
        postId: post._id,
        userId: sessionUser?.user?.id,
      });
      post.likedByUser = !!liked;

      // Fetch likes for each comment
      for (const comment of post.comments) {
        const liked = await Like.findOne({
          // If there is a liked comment, it will return true
          postId: comment._id,
          userId: sessionUser?.user?.id,
        });
        comment.likedByUser = !!liked; // Add `likedByUser` boolean. Double exclamation mark is true in this case. !!{} -> true
      }
      // console.log("Posts:", JSON.stringify(posts[1], null, 2));
    }

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get posts", { status: 500 });
  }
};
