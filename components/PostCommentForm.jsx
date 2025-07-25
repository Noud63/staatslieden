"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { IoSendSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { useTranslations } from "next-intl";
import { optimisticAddComment } from "@/utils/optimisticUpdate";

const PostCommentForm = ({ postId, parentId = null, setShowForm, showForm, post }) => {
  const [text, setText] = useState("");
  const [sendButton, setSendButton] = useState(false);

  const { data: session } = useSession();
  const id = session?.user?.id;
  const user = session?.user;

  const textareaRef = useRef(null);

  const router = useRouter();

  const t = useTranslations("placeholder");

  
  const tempComment = {
    postId,
    parentId: parentId || null,
    userId: session?.user.id,
    username: session?.user.username,
    comment: text,
    createdAt: new Date().toISOString(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      mutate("/api/getposts", optimisticAddComment(postId, tempComment), false);
      mutate(
        `/api/getposts/postsByUserId/${post.userId}`,
        optimisticAddComment(postId, tempComment),
        false,
      );

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          parentId: parentId || null,
          userId: session?.user.id,
          username: session?.user.username,
          comment: text,
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        setShowForm(false);
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    } finally {
      textareaRef.current.value = "";
      setSendButton(false);
    }
    // Revalidate to fetch the real comment
    mutate("/api/getposts");
    mutate(`/api/getposts/postsByUserId/${post.userId}`);
  };

  useEffect(() => {
    if (text !== "") {
      setSendButton(true);
    } else {
      setSendButton(false);
    }
  }, [text]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleTextareaClick = () => {
    if (!session) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
    }
  }, [text]); // Depend on comment to update on each change

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-1">
      <textarea
        ref={textareaRef}
        type="text"
        name="comment"
        className="max-h-[500px] w-full resize-none overflow-y-hidden rounded-xl bg-yellow-800/10 py-2 pl-2 pr-10 placeholder-gray-500 outline-none"
        placeholder={t("schrijfeenreactie")}
        defaultValue={text}
        onChange={handleInputChange}
        onClick={handleTextareaClick}
        disabled={!user}
      />
      <button
        type="submit"
        className="absolute bottom-2 right-2 cursor-pointer"
      >
        {sendButton && <IoSendSharp color="brown" size={25} />}
      </button>
    </form>
  );
};

export default PostCommentForm;
