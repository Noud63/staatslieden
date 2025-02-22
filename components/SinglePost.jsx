"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import PostComment from "./PostComment";
import LikeandShareBar from "./LikeandShareBar";
import PostUserName from "./PostUserName";
import Editordelete from "./Editordelete";
import threedots from "../assets/icons/threedots.png";
import { useSession } from "next-auth/react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const SinglePost = ({ post}) => {

   const slides = [
     {
       src: post?.images[0]
     },
   ];

  const { data: session } = useSession();
  const [showThreeDots, setShowThreeDots] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (session?.user.id === post?.userId) {
      setShowThreeDots(true);
    }
    if (post?.avatar) {
      setProfilePic(post.avatar);
    }
  }, [session, post?.userId, post?.avatar]);
  

  return (
    <div className="singlepost relative mx-6 mb-4 flex h-auto flex-col rounded-lg bg-white shadow-md max-sm:mx-4 max-xsm:mx-2">
      <Editordelete
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        postId={post._id}
        post={post}
      />

      <div className="flex w-full items-center justify-between border-b border-gray-400 p-4 pb-2 max-xxsm:pl-2">
        <div className="flex flex-1">
          <div className="flex h-[45px] w-[45px] flex-row overflow-hidden max-xxsm:h-[40px] max-xxsm:w-[40px]">
            <Image
              src={profilePic ? profilePic : "/images/defaultAvatar.png"}
              alt="icon"
              width={45}
              height={45}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <PostUserName post={post} />
        </div>

        {showThreeDots && (
          <div>
            <Image
              src={threedots}
              alt=""
              width={40}
              height={40}
              className="h-[40px] w-[40px] cursor-pointer rounded-full p-2 transition-all hover:bg-yellow-800/40"
              onClick={() => setShowOptions(!showOptions)}
            />
          </div>
        )}
      </div>
      <div className="p-4">{post.postContent}</div>
      <div className="w-full">
        {post?.images[0] && (
          <Image
            src={post?.images[0]}
            alt=""
            width={400}
            height={0}
            className="h-full w-full cursor-pointer object-cover"
            priority
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      <LikeandShareBar post={post} />
      <PostComment post={post} />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom, Captions]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 5,
        }}
        slides={slides}
        carousel={{ finite: slides.length <= 1 }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
        styles={{
          container: {
            backgroundColor: "rgb(66, 32, 6, 0.8)",
          },
        }}
      />
    </div>
  );
};

export default SinglePost;
