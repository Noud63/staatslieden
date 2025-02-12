"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoSendSharp } from "react-icons/io5";
import { fetchPosts } from "@/utils/postsRequest";
import { mutate } from "swr";

const PostCommentOnCommentForm= ({ postId, commentId, setShowForm }) => {
  const { data: session } = useSession();

  const id = session?.user?.id;
  const user = session?.user;

  const [comment, setComment] = useState("");
  const [sendButton, setSendButton] = useState(false);

  const textareaRef = useRef(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      router.push("/pages/login");
    }

    const data = {
      userId: id,
      postId: postId,
      commentId: commentId,
      username: user?.username,
      reactionComment: comment,
    };

    try {
      const res = await fetch("/api/comments", {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log("Res:", result)
      if(res.ok){
        setShowForm(false);
        console.log(result.message);
      }

      if (res.status === 401) {
        console.log("Error:", result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      textareaRef.current.value = "";
    }
    mutate("/api/posts");
  };

  useEffect(() => {
    if (comment !== "") {
      setSendButton(true);
    } else {
      setSendButton(false);
    }
  }, [comment]);

  // Function to handle input change
  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleTextareaClick = () => {
    if (!session) {
      router.push("/pages/login");
    }
  };

  // Adjust the textarea height whenever the comment changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
    }
  }, [comment]); // Depend on comment to update on each change

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-1 mb-4">
      <textarea
        ref={textareaRef}
        type="text"
        name="comment"
        className="max-h-[500px] min-h-[50px] w-full resize-none overflow-y-hidden rounded-xl bg-gray-100 py-2 pl-2 pr-10 placeholder-gray-500 outline-none"
        placeholder="Schrijf een reactie"
        defaultValue={comment}
        onChange={handleInputChange}
        onClick={handleTextareaClick}
        disabled={!user}
      />
      <button
        type="submit"
        className="absolute bottom-2 right-2 cursor-pointer"
      >
        {sendButton && <IoSendSharp color="#900" size={22} />}
      </button>
    </form>
  );
};

export default PostCommentOnCommentForm;
