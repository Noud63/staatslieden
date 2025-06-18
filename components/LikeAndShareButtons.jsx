"use client"
import React from 'react'
import LikeButton from './LikeButton';
import { FaWhatsapp } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { useSession } from "next-auth/react";


const LikeAndShareButtons = ({post}) => {

  

  const { data: session } = useSession();

  const sharedPost = `${window.location.href}/sharedpost/${post._id}`;
  // console.log('post', post);
 
  // console.log('SharePost', sharedPost);

  return (
    <div className="flex w-full flex-row justify-between pl-4 pr-6">
      <LikeButton postId={post._id} post={post} />

      <div className="flex h-full cursor-pointer items-center">
        {session ? (<WhatsappShareButton url={sharedPost}>
          <FaWhatsapp color="gray" size={30} className="cursor-pointer" />
        </WhatsappShareButton>
      ) : (
      <FaWhatsapp color="gray" size={30} className="cursor-not-allowed" />)}
       
      </div>
      <TbShare3 color="gray" size={30} className="cursor-pointer" />
    </div>
  );
}

export default LikeAndShareButtons
