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
      className={`${openModal ? "translate-x-0" : "translate-x-full"} fixed bottom-0 right-0 top-0 z-[999] flex h-full max-h-screen w-full max-w-[635px] flex-col 
      items-center justify-start overflow-y-auto bg-[rgba(255,255,255,0.7)] px-2 backdrop-blur-sm transition duration-300 ease-in`}
      onClick={closeModal}
    >
      <div className="mt-8 mb-6 cursor-pointer" onClick={closeModal}>
        <IoMdCloseCircleOutline size={35} color="#713f12" />
      </div>
      <div className="grid w-full grid-cols-2 gap-2 rounded-xl">
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <Link href={item?.href || "/not-found"}>
                <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg 
                border-2 border-yellow-900 tracking-wide text-yellow-950 font-semibold shadow-lg">
                  {currentLocale === "nl" ? item.title[0] : item.title[1]}
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="flex w-full justify-center">
        <div className="mt-12 flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 border-[#422006] pb-1 pl-[2px]">
          <Image
            src={"/images/logo_yellow.png"}
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
