"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaThumbsUp } from "react-icons/fa";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import getNotifications from "@/utils/getNotifications";
import NotificationListItems from "./NotificationListItems";

const SideBarNotificationList = ({
  setCount,
  showPanel,
  setShowPanel,
  setPostId,
}) => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);

  const sidebarRef = useRef(null);

  // Close when clicking outside sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      console.log("Clicked outside sidebar:", event.target);
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) // true, same as sidebarRef.current.contains(event.target) === false
      ) {
        setShowPanel(false);
      }
    }
    if (showPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel, setShowPanel]);


  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchNotifications = async () => {
      const res = await getNotifications();
      if (res && Array.isArray(res.notifications)) {
        setNotifications(res.notifications);
        setCount(res.notifications.length);
      }
    };
    fetchNotifications();

  }, [session?.user?.id, setCount]);


  const getLikedPostOrComment = (postId) => {
    if (!postId) {
      console.warn("No postId found for notification:", note);
      return;
    }
    setPostId(postId);
    setShowPanel(false);
  };


  const deleteAllNotifications = async () => {
    try {
      const response = await fetch("/api/deleteAllNotifications", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });   
      if (response.ok) {
        setNotifications([]);
        setCount(0);
        setShowPanel(false);
      } 
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  }

return (
    <div
      className={`sidebar_scroll ${showPanel ? "translate-x-0" : "translate-x-full"} fixed bottom-0 right-0 top-0 z-[10] flex h-full max-h-screen w-full 
      max-w-[340px] flex-col overflow-y-auto bg-[rgba(255,255,255)] pr-2 pl-4 pb-6 shadow-xl backdrop-blur-sm transition duration-300 ease-in`}
      ref={sidebarRef}
       >
      <div className="mb-2 mt-4 flex w-full justify-around border-b border-yellow-900">
        <FaThumbsUp color="#713f12" size={24} className="mb-4 mr-2" />
        <IoMdCloseCircleOutline
          color="#713f12"
          size={30}
          onClick={() => setShowPanel(false)}
          className="mb-4 cursor-pointer"
        />
      </div>
      <ul className="flex flex-col pt-2">
        {notifications.map((note) => (
          <NotificationListItems key={note._id} note={note} getLikedPostOrComment={getLikedPostOrComment} />
        ))}
      </ul>

      <button
        type="button"
        className="mx-auto mt-8 w-full rounded-lg bg-gradient-to-r from-yellow-950 via-yellow-700 to-yellow-950 py-2 text-white"
        onClick={deleteAllNotifications}
      >
        Verwijder likes
      </button>

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


// Like a comment
// await Notification.create({
//           recipient: comment.userId,
//           sender: userId,
//           type: "like",
//           comment: comment._id,
//           isRead: false,
//           postId: comment.postId 
//         });

// Example notification object structure:
// Like on a comment does not have a post field
// {
//     "_id": "68f8e252749a42238ef40357",
//     "recipient": "67a3453aee56feb8d589b01d",
//     "type": "like",
//     "comment": {
//       "_id": "68f8c9dc491e65f26f9b499e",
//       "postId": "68f2379f211b5e16e76a9d84",
//       "parentId": "68f8c990491e65f26f9b496f",
//       "userId": "67a3453aee56feb8d589b01d",
//       "username": "Jane",
//       "comment": "Jazeker, dat is niet te geloven!",
//       "likesCount": 1,
//       "createdAt": "2025-10-22T12:11:08.331Z",
//       "updatedAt": "2025-10-22T13:55:30.782Z",
//       "__v": 0
//     },
//     "sender": {
//       "_id": "66f531615ed693d84f788a5e",
//       "name": "Noud van Dun",
//       "username": "Noud",
//       "avatar": "https://res.cloudinary.com/ajhvdwebdev/image/upload/v1758188017/nextjs_blog/rz4hpxtfsk946mu5ce7t.png"
//     },
//     "postId": "68f2379f211b5e16e76a9d84",
//     "isRead": false,
//     "createdAt": "2025-10-22T13:55:30.766Z",
//     "__v": 0
//   },