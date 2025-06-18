import React from 'react'
// import { getSinglepostById } from '@/utils/postsRequest';
import connectDB from "@/connectDB/database";
import Post from "@/models/post";
// import { notFound } from "next/navigation";
// import LikeButton from "@/components/LikeButton";
// import { FaWhatsapp } from "react-icons/fa";
// import Image from 'next/image';

const SharedPostPage = async ({ params }) => {

  await connectDB();

  const post = await Post.findById(params.postId).lean();

  // if (!post) return notFound();

  // const sharedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post._id}`;

  return (
    <div>
      <div>{post.name}</div>
      <div>{post.postContent}</div>
      <div>
        {/* <Image src={post.images[0]} width={100} height={100}/> */}
      </div>
    </div>
  );
};

export default SharedPostPage
