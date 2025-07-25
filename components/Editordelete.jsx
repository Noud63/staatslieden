"use client";
import { useState } from "react";
import Image from "next/image";
import edit from "../assets/icons/edit.png";
import deleteIcon from "../assets/icons/delete.png";
import EditPostForm from "./EditPostForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { mutate } from "swr";
import { useTranslations } from "next-intl";
import { optimisticDeletePost } from "@/utils/optimisticUpdate"; // Assuming you have this utility function 

const Editordelete = ({ showOptions, setShowOptions, postId, post }) => {

  const [showEditForm, setShowEditForm] = useState(false);

  const t = useTranslations("auth");

  const showEditPostModal = () => {
    setShowEditForm(true);
    setShowOptions(false);
  };

  const deletePost = async () => {
         try {
          // Optimistically update the UI both for all the post and the post by user
          mutate("/api/getposts", optimisticDeletePost(postId), false);
          mutate(
            `/api/getposts/postsByUserId/${post.userId}`,
            optimisticDeletePost(postId),
            false,
          );
          
          const res = await fetch(`/api/deletepost/${postId}`, {
            method: "DELETE",
          });

          const data = await res.json();
          console.log(data.message)

          if (res.ok) {
            // console.log(data.message);
            setShowOptions(false);
          }
        } catch (error) {
          console.log(error);
        }
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
