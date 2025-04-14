"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from 'next/link';
import Hamburger from './Hamburger';
import Weatherreport from './Weatherreport';

const LoginRegisterLogout = () => {

const { data: session, status } = useSession();

  return (
    <div className="flex w-full flex-row items-center text-white max-md:mx-4 max-md:mt-4 max-md:justify-between">
      <Hamburger />

      <div className="flex flex-row gap-4">
        {!session ? (
          <Link href="/pages/register" className="">
            Registreer
          </Link>
        ) : (
          ""
        )}

        <div className="flex items-center justify-center gap-4 w-[160px]">
          {!session?.user ? (
            <Link href="/pages/login" className="flex w-full justify-end pr-3">
              Inloggen
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
              <span>Uitloggen</span>
            </button>
          )}
        </div>
      </div>
        <Link href="/pages/weatherreport"  className="md:hidden">
        <Weatherreport />
      </Link>
    </div>
  );
}

export default LoginRegisterLogout
