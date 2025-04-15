"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from 'next/link';
import Hamburger from './Hamburger';
import Weatherreport from './Weatherreport';
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/data/translations";


const LoginRegisterLogout = () => {

const { data: session, status } = useSession();

const { language, toggleLanguage } = useLanguage();
const t = translations[language].user;

  return (
    <div className="flex flex-row items-center text-white max-md:mx-4 max-md:mt-4 max-md:justify-between max-md:w-full">
      <Hamburger />

      <div className="flex flex-row gap-4">
        {!session ? (
          <Link href="/pages/register" className="">
           {t.registreer}
          </Link>
        ) : (
          ""
        )}

        <div className="flex items-center justify-center gap-4">
          {!session?.user ? (
            <Link
              href="/pages/login"
              className="flex w-full justify-end"
            >
              {t.login}
            </Link>
          ) : (
            <Link href="/pages/profile">
              <span className="flex items-center justify-start">{`Hi, ${session?.user?.username}`}</span>
            </Link>
          )}

          {session?.user && (
            <button
              className="max-sm:mr-2"
              onClick={() => {
                signOut({ callbackUrl: "/", redirect: true });
              }}
            >
              <span>{t.loguit}</span>
            </button>
          )}
        </div>
      </div>

      <Link href="/pages/weatherreport" className="md:hidden">
        <Weatherreport />
      </Link>

    </div>
  );
}

export default LoginRegisterLogout
