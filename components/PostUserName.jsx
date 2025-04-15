"use client"
import React from 'react'
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";

const PostUserName = ({post}) => {

  const { language, toggleLanguage } = useLanguage();

return (
    <div className="flex flex-col justify-start text-lg font-semibold text-black ml-2">
      <Link href={`/pages/postsByUserId/${post.userId}`}>
        <div>
          {post.name}
        </div>
      </Link>
      <span className="w-full flex text-sm font-normal text-gray-500">
        {language === "dutch" ? "Gepost op:": "Posted on:"} {new Date(post.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}

export default PostUserName
