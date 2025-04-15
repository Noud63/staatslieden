"use client"
import React from "react";
import items from "../data/menuItems.json"
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const Menu = () => {

  const { language, toggleLanguage } = useLanguage();

return (
    <div className="mx-auto mt-4 w-full max-w-[1980px] px-4">
      <div className="grid grid-cols-3 gap-2 max-sm:hidden xl:grid-cols-6">
        {items &&
          items.map((item, index) => (
            <div key={index}>
              <Link href={item?.href || "/not-found"}>
                <div className="menuitem ease-in-out hover:text-xl hover:tracking-wider flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border-2 text-white 
                transition-all delay-100 duration-200 max-sm:h-10">
                  {language === "dutch" ? item.title[0] : item.title[1]}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
