"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Hamburger from "./Hamburger";
import Weatherreport from "./Weatherreport";
import { useTranslations } from "next-intl";
import NavbarNotificationBadge from "./NavbarNotificationBadge";

const LoginRegisterLogout = () => {

  const { data: session, status } = useSession();

  const t = useTranslations("auth");

  return (
    <div className="flex flex-row items-center text-white max-md:mt-4 justify-between max-xsm:h-[50px]">
      <Hamburger />

      <div className="flex flex-row gap-4">
        {!session ? (
          <Link href="/register" className="">
            {t("registreren")}
          </Link>
        ) : (
          ""
        )}

        <div className="flex items-center justify-center gap-10">
          {!session?.user ? (
            <Link href="/login" className="flex w-full justify-end">
              {t("inloggen")}
            </Link>
          ) : (
            <div className="relative">
            <Link href="/profile">
              <span className="flex items-center justify-start">{`Hi, ${session?.user?.username}`}</span>
            </Link>
            <NavbarNotificationBadge />
            </div>
          )}

          {session?.user && (
            <button
              className="max-sm:mr-2"
              onClick={() => {
                signOut({ callbackUrl: "/", redirect: true });
              }}
            >
              <span> {t("uitloggen")}</span>
            </button>
          )}
        </div>
      </div>

      <Link href="/weatherreport" className="md:hidden">
        <Weatherreport />
      </Link>
    </div>
  );
};

export default LoginRegisterLogout;
