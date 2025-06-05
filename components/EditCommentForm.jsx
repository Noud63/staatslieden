"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { mutate } from "swr";

const EditCommentForm = ({comment, setShowEditComment}) => {
  const [commentContent, setCommentContent] = useState(comment?.comment);

  const textareaRef = useRef(null);

  const updatedData = {
    commentContent,
  };

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      // Move cursor to end of text
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
    }
  }, [commentContent]); // Depend on comment to update on each change

  const handleEditPost = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append("commentContent", updatedData.commentContent);

    console.log("FormData", formData);

    try {
      const res = await fetch(`/api/editComment/${comment._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log(data.message);
        setShowEditComment(false);
      }
    } catch (error) {
      console.log(error);
      console.log(data.message);
    }
    mutate("/api/posts");
  };

  return (
    <div className="flex w-full items-center justify-center overflow-y-auto rounded-lg border-b border-gray-300 bg-yellow-800/10 shadow-lg">
      <div className="w-full overflow-y-auto rounded-lg px-4">
        <div className="flex items-center justify-between border-b border-black pb-1 pt-2">
          <span className="text-lg font-semibold">Bewerk:</span>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => setShowEditComment(false)}
          >
            <IoMdCloseCircleOutline size={24} color={"#854d0e"} />
          </div>
        </div>

        <form onSubmit={handleEditPost} className="mt-2 w-full">
          <div className="w-full">
            <textarea
              ref={textareaRef}
              type="text"
              name="commentContent"
              defaultValue={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="max-h-[500px] w-full resize-none rounded-xl bg-transparent py-2  pr-10 placeholder-gray-500 outline-none"
            />
          </div>

          <div className="mb-4 mt-4 flex w-full justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-yellow-950 via-yellow-700 to-yellow-950 py-2 font-semibold text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCommentForm
