"use client";
import { useState } from "react";
import Image from "next/image";
import edit from "../assets/icons/edit.png";
import deleteIcon from "../assets/icons/delete.png";
import EditPostForm from "./EditPostForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { mutate } from "swr";
import { useTranslations } from "next-intl";

const Editordelete = ({ showOptions, setShowOptions, postId, post }) => {

  const [showEditForm, setShowEditForm] = useState(false);

  const t = useTranslations("auth");

  const showEditPostModal = () => {
    setShowEditForm(true);
    setShowOptions(false);
  };

  const deletePost = async () => {
    mutate(
      `/api/posts`,
      async (currentData) => {
        // Find the post that contains the comment
        const updatedPosts = currentData.filter((post) => {
          return post._id !== postId;
        });

        try {
          const res = await fetch(`/api/deletepost/${postId}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if (res.ok) {
            console.log(data.message);
            setShowOptions(false);
          }
        } catch (error) {
          console.log(data.message);
          return currentData; // Rollback on failure
        }
        return updatedPosts; // Return updated UI state
      },
      false,
    ); // `false` means it won't revalidate immediately
    
  };

  return (
    <>
      {showEditForm && (
        <EditPostForm setShowEditForm={setShowEditForm} post={post} />
      )}
      {showOptions && (
        <div className="postMenu absolute right-3 top-16 flex h-auto w-[240px] flex-col rounded-lg bg-white p-4 text-lg font-semibold border border-gray-300">
          <div
            className="items-center flex-row mb-2 flex w-full cursor-pointer border-b border-gray-400 pb-2"
            onClick={showEditPostModal}
          >
            <Image
              src={edit}
              alt=""
              width={32}
              height={32}
              className="h-[32px] w-[32px] cursor-pointer p-2"
            />
            <span>{t("bewerk")}</span>
          </div>
          <div
            className="flex w-full cursor-pointer flex-row items-center border-b border-gray-400 pb-2"
            onClick={deletePost}
          >
            <Image
              src={deleteIcon}
              alt=""
              width={32}
              height={32}
              className="h-[34px] w-[32px] cursor-pointer p-2"
            />
            <span>{t("verwijder")}</span>
          </div>
          <div className="mt-4 flex w-full justify-center">
            <button type="button" onClick={() => setShowOptions(false)}>
              <AiOutlineCloseCircle size={24} color="#000" />
            </button>
          </div>

          <div className="absolute -top-[12px] right-3 h-0 w-0 border-b-[12px] border-l-[10px] border-r-[10px] border-b-white border-l-transparent border-r-transparent"></div>
        </div>
      )}
    </>
  );
};

export default Editordelete;
