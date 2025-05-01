import React from "react";
import Link from "next/link";
import data from "../data/menuItems.json";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import { useLocale } from "next-intl";

const MenuOverlay = ({ setOpenModal, openModal }) => {

  const currentLocale = useLocale();
  
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      className={`${openModal ? "translate-x-0" : "translate-x-full"} fixed bottom-0 right-0 top-0 z-[999] flex h-full max-h-screen w-full max-w-[635px] flex-col items-center justify-start overflow-y-auto bg-gradient-to-r from-red-950 via-yellow-700 to-red-950 p-4 backdrop-blur-lg transition duration-300 ease-in`}
      onClick={closeModal}
    >
      <div className="my-8 cursor-pointer" onClick={closeModal}>
        <IoMdCloseCircleOutline size={35} color="#fff" />
      </div>
      <div className="grid w-full grid-cols-2 gap-2 rounded-xl">
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <Link href={item?.href || "/not-found"}>
                <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border-[3px] border-white font-normal tracking-wide text-white shadow-lg">
                  {currentLocale === "nl" ? item.title[0] : item.title[1]}
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="flex w-full justify-center">
        <div className="mt-12 flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 pb-1 pl-[2px]">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={100}
            height={0}
            className="h-[40px] w-[40px] rotate-6 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
