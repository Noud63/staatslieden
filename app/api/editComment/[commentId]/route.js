import connectDB from "@/connectDB/database";

import Comment from "@/models/comment";
import { getSessionUser } from "@/utils/getSessionUser";


export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { commentId } = params;

    console.log({ "CommentId": commentId }); 

    const formData = await request.formData();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user.id) {
      return new Response(
        JSON.stringify({ message: "You need to login first or register!" }),
        { status: 401 }
      );
    }

    const content = await formData.get("commentContent");

    console.log("Content:", content); 
  
    // const commentData = {
    //   postContent: content,
    // };

    // if (images) {
    //   const imageUploadPromises = [];

    //   for (const image of images) {
    //     const imageBuffer = await image.arrayBuffer();
    //     const imageArray = Array.from(new Uint8Array(imageBuffer));
    //     const imageData = Buffer.from(imageArray);

    //     //Convert the image data to base64
    //     const imageBase64 = imageData.toString("base64");

    //     //Make request to upload to cloudinary
    //     const result = await cloudinary.uploader.upload(
    //       `data:image/png;base64,${imageBase64}`,
    //       { folder: "nextjs_blog" }
    //     );

    //     imageUploadPromises.push(result.secure_url);

    //     //Wait for all images to upload
    //     const uploadedImages = await Promise.all(imageUploadPromises);

    //     //Add uploaded images to the post
    //     postData.images = uploadedImages;
    //   }
    // }

    // const updatedPost = await Comment.findByIdAndUpdate(
    //   {
    //     _id: commentId,
    //   },
    //   { $set: commentData },
    //   { new: true }
    // );

    // console.log("Updated Post:", content);  

    return new Response(
      JSON.stringify({ message: "Comment updated successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Update failed!" }), {
      status: 500,
    });
  }
};
