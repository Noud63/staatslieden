"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaThumbsUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const SideBarNotificationList = ({
  setCount,
  showPanel,
  setShowPanel,
  setPostId,
}) => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    async function fetchNotifications() {
      const res = await fetch("/api/getNotifications");
      const data = await res.json();
      setCount(data.notifications?.length || 0);
      setNotifications(data.notifications || []);
    }
    fetchNotifications();
  }, [session?.user?.id, setCount]);

  const getLikedPostOrComment = async (note) => {
    try {
      const postId = note?.post?._id || note?.comment?.postId;
      if (!postId) return;
      setPostId(postId);
      setShowPanel(false);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  return (
    <div
      className={`${showPanel ? "translate-x-0" : "translate-x-full"} fixed bottom-0 right-0 top-0 z-[10] flex h-full max-h-screen w-full max-w-[340px] flex-col overflow-y-auto bg-[rgba(255,255,255)] px-4 pb-6 shadow-xl backdrop-blur-sm transition duration-300 ease-in`}
    >
      <div className="mb-2 mt-4 flex w-full justify-around border-b border-yellow-900">
        <FaThumbsUp
          color="#713f12"
          size={20}
          disabled={!session?.user ? true : false}
          className="mb-4 mr-2"
        />
        <IoMdClose
          color="#713f12"
          size={24}
          onClick={() => setShowPanel(false)}
          className="mb-4 cursor-pointer"
        />
      </div>
      <ul className="flex flex-col pt-3">
        {notifications.map((note) => (
          <li
            key={note._id}
            className="w-full border-b-2 border-dotted border-yellow-950 pt-4"
             >
            <div
              className="flex cursor-pointer flex-col"
              onClick={() => getLikedPostOrComment(note)}
                >
              {note.post ? (
                <div className="flex w-full flex-col text-yellow-900">
                  <div className="flex justify-center pb-2">
                    <Image
                      src={note?.sender.avatar || "/images/logo_yellow.png"}
                      alt="logo"
                      width={100}
                      height={0}
                      className="h-[30px] w-[30px] rounded-full object-cover"
                    />
                  </div>
                  <div className="mx-auto flex flex-col justify-start">
                    <div className=" text-yellow-950">
                      <span className="font-semibold">{note.sender?.name || note.sender?.username} </span>{" "}
                      <span>likes your post: <br /></span>
                    </div>
                    
                    <span>
                      {note.post.postContent.length < 35
                        ? note.post.postContent
                        : note.post.postContent.slice(0, 35) + "..."}
                    </span>
                    <div className="mb-6 flex flex-col border-yellow-900 pb-2">
                      <small className="pt-1 text-gray-500">
                        created: {new Date(note.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex w-full flex-col text-yellow-900">
                  <div className="flex justify-center pb-2">
                    <Image
                      src={note?.sender.avatar || "/images/logo_yellow.png"}
                      alt="logo"
                      width={100}
                      height={0}
                      className="h-[30px] w-[30px] rounded-full object-cover"
                    />
                  </div>

                  <div className="mx-auto flex flex-col justify-start">
                    <div className=" text-yellow-950">
                      <span className="font-semibold">{note.sender?.name || note.sender?.username}</span>{" "}
                      <span>likes your comment: </span><br />
                    </div>
                    
                    <span className="text-yellow-900">
                      {note.comment.comment.length < 35
                        ? note.comment.comment
                        : note.comment.comment.slice(0, 35) + "..."}
                    </span>
                    <div className="mb-6 flex flex-col border-yellow-900 pb-2">
                      <small className="pt-1 text-gray-500">
                        created: {new Date(note.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center">
        <div className="mt-8 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[#422006] pb-1 pl-[2px]">
          <Image
            src={"/images/logo_yellow.png"}
            alt="logo"
            width={100}
            height={0}
            className="h-[16px] w-[16px] rotate-6 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarNotificationList;
