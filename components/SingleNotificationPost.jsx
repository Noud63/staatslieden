import React from "react";
import SinglePost from "./SinglePost";
import Spinner from "./Spinner";

const SingleNotificationPost = ({ postId, setPostId }) => {
  
  if (!postId) {
    return <Spinner loading={true} size={80} />;
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={setPostId}
    >
      <div
        className="relative max-h-[100vh] w-full max-w-[720px] overflow-y-auto p-6 shadow-xl max-sm:px-2"
        onClick={(e) => e.stopPropagation()}
      >
        <SinglePost postId={postId} setPostId={setPostId} />
      </div>
    </div>
  );
};

export default SingleNotificationPost;
