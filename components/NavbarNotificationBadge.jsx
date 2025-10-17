"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaThumbsUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import SinglePost from "./SinglePost";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Spinner from "./Spinner";
import { mutate } from "swr";
import SideBarNotificationList from "./SideBarNotificationList";
import SingleNotificationPost from "./SingleNotificationPost";

export default function NavbarNotificationBadge() {
  
  const { data: session } = useSession();
  const [count, setCount] = useState();
  const [showPanel, setShowPanel] = useState(false);
  const [postId, setPostId] = useState(null);

  const handleBadgeClick = () => {
    setShowPanel((prev) => !prev);
  };

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

      <SideBarNotificationList
        postId={postId}
        setCount={setCount}
        count={count}
        showPanel={showPanel}
        setShowPanel={setShowPanel}
        setPostId={setPostId}
      />

      {postId && (
        <SingleNotificationPost
          postId={postId}
          setPostId={() => setPostId(null)}
        />
      )}
    </>
  );
}
