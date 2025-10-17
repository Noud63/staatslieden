import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const CloseSinglePostButton = ({ setPostId }) => {
  return (
    <div className="w-full border-b border-gray-400 p-2 flex justify-center pb-4">
      <div
        className="mt-2 cursor-pointer rounded-full "
        onClick={setPostId}
      >
        <IoMdCloseCircleOutline size={30} color={"black"} />
      </div>
    </div>
  );
};

export default CloseSinglePostButton;
