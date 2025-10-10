"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaThumbsUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

export default function NavbarNotificationBadge() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    async function fetchNotifications() {
      const res = await fetch("/api/getNotifications");
      const data = await res.json();
      setCount(data.notifications?.length || 0);
      setNotifications(data.notifications || []);
    }
    fetchNotifications();
  }, [session?.user?.id]);

  const handleBadgeClick = () => {
    setShowPanel((prev) => !prev);
  };

  const getLikedPostOrComment = async (note) => {
    if(note?.post){
       console.log("Notification postId:", note._id);
       const res = await fetch(`/api/getSinglePost/${note.post._id}`);
       console.log(await res.json())

    }else if(note?.comment){
      console.log("Notification commentId:", note._id);
    }
  }

  if (!session?.user?.id || count === 0) return null;

  return (
    <>
      <div onClick={handleBadgeClick}>
        <span
          style={{
            position: "absolute",
            top: "-14px",
            right: "-22px",
            background: "red",
            width: "1.5em",
            height: "1.5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            borderRadius: "50%",
            fontWeight: "bold",
            fontSize: "0.9em",
            cursor: "pointer",
          }}
        >
          {count}
        </span>
      </div>

      <div
        className={`${showPanel ? "translate-x-0" : "translate-x-full"} fixed bottom-0 right-0 top-0 z-[10] flex h-full max-h-screen 
        w-full max-w-[290px] flex-col overflow-y-auto bg-[rgba(255,255,255)] px-2 shadow-lg backdrop-blur-sm transition duration-300 ease-in`}
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
        <ul className="flex flex-col px-2 pt-3">
          {notifications.map((note) => (
            <li key={note._id}>
              <div className="flex flex-col" onClick={() => getLikedPostOrComment(note)}>
                {note.post ? (
                  <span className="text-yellow-900">
                    <div className="flex w-full justify-center">
                    <Image
                      src={note?.sender.avatar || "/images/logo_yellow.png"}
                      alt="logo"
                      width={100}
                      height={0}
                      className="h-[30px] w-[30px] rounded-full object-cover"
                    />
                    </div>
                    <span className="font-semibold text-yellow-950">
                      {note.sender?.name || note.sender?.username}
                    </span>{" "}
                    Likes your post: <br />
                    <span>
                      {note.post.postContent.length < 35 ?  note.post.postContent :  note.post.postContent.slice(0, 35) + "..."}
                      </span>
                  </span>
                ) : (
                  <span className="text-yellow-900">
                    <div className="flex w-full justify-center">
                      <Image
                        src={note?.sender.avatar || "/images/logo_yellow.png"}
                        alt="logo"
                        width={100}
                        height={0}
                        className="h-[30px] w-[30px] rounded-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-yellow-950">
                      {note.sender?.name || note.sender?.username}
                    </span>{" "}
                    Likes your comment: <br />
                    <span className="text-yellow-900">
                     {note.comment.comment.length < 35 ?  note.comment.comment :  note.comment.comment.slice(0, 35) + "..."}
                    </span>
                  </span>
                )}
              </div>
              <div className="flex flex-col mb-6 border-b border-dotted border-yellow-900 pb-2">
                <small className="pt-1 text-gray-500">
                  created: {new Date(note.createdAt).toLocaleString()}
                </small>
                
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
    </>
  );
}
