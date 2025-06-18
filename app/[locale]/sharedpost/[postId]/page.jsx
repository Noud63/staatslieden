import React from 'react'
// import { getSinglepostById } from '@/utils/postsRequest';
import connectDB from "@/connectDB/database";
import Post from "@/models/post";
// import { notFound } from "next/navigation";
// import LikeButton from "@/components/LikeButton";
// import { FaWhatsapp } from "react-icons/fa";
import Avatar from '@/models/avatar';
import Image from 'next/image';
import PostUserName from '@/components/PostUserName';

const SharedPostPage = async ({ params }) => {

  await connectDB();

  const { postId } = params;

  const post = await Post.findById({_id:postId}).lean();

  const avatar = await Avatar.findOne({ userId: post.userId }).lean();
  console.log("Avatar", avatar);  


  post.avatar = avatar ? avatar.avatar : "/images/defaultAvatar.png";
  const sharedPost = JSON.parse(JSON.stringify(post));

  console.log(avatar);  

  // if (!post) return notFound();

  return (
    <div className="mx-auto flex w-full max-w-[670px] flex-grow flex-col rounded-lg py-4">
      <div className="singlepost relative mx-6 mb-4 flex h-auto flex-col rounded-lg bg-white shadow-md max-sm:mx-4 max-xsm:mx-2">
       
        <div className="flex w-full items-center justify-between border-b border-gray-400 p-4 pb-2 max-xxsm:pl-2">
          <div className="flex flex-1">
            <div className="flex h-[45px] w-[45px] flex-row overflow-hidden max-xxsm:h-[40px] max-xxsm:w-[40px]">
              <Image
                src={
                  sharedPost
                    ? sharedPost.avatar
                    : "/images/defaultAvatar.png"
                }
                alt="icon"
                width={45}
                height={45}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <PostUserName post={sharedPost} />
          </div>

        </div>
        <div className="p-4">{sharedPost.postContent}</div>
        <div className="w-full">
          {sharedPost?.images[0] && (
            <Image
              src={sharedPost?.images[0]}
              alt=""
              width={400}
              height={0}
              className="h-full w-full cursor-pointer object-cover"
              priority
            />
          )}
        </div>
        {/* <LikeandShareBar post={post} /> */}
        {/* <PostComment post={post} /> */}
        
      </div>
    </div>
  );
};

export default SharedPostPage
