"use client"
import React from 'react'
import Image from 'next/image';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/data/translations";


const LeesDitEerstPage = () => {

  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].lees_dit;
  
  return (
    <div className="mx-4">
      <div className="mx-auto mt-[20px] w-full max-w-[620px] flex-col rounded-lg border-2 p-4">
        <div className="mb-4 flex items-center justify-between border-b pb-4 text-xl font-semibold text-white">
          <span>{t.regels_titel}</span>
          <Link href={"/"}>
            <AiOutlineCloseCircle size={30} color="#fff" />
          </Link>
        </div>
        <div className="mb-4 text-white">
          <div className="mb-4">
            {t.regels_a1}
            <br />
          </div>
          {t.regels_a2}
        </div>
        <div className="px-4 text-white">
          <ul className="list-disc">
            <li>{t.regels_1}</li>
            <li>{t.regels_2}</li>
            <li>{t.regels_3}</li>
            <li>{t.regels_4}</li>
          </ul>
        </div>

        <div className="my-12 flex flex-col items-center justify-center text-white">
          <Image
            src={"/icons/respect.png"}
            alt="respect"
            width={60}
            height={60}
          />
          respect
        </div>
      </div>
    </div>
  );
}

export default LeesDitEerstPage;
