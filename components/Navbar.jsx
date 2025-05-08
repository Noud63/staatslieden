import React from "react";
import Link from "next/link";
import Weatherreport from "./Weatherreport";
import LoginRegisterLogout from "./LoginRegisterLogout";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "next-intl";

const Navbar = () => {
  const locale = useLocale();

  return (
    <div className="navbar flex h-[100px] w-full justify-between border-b border-yellow-800 py-3 max-sm:px-4">
      <div className="mx-auto flex w-full max-w-[1980px] flex-row items-center justify-between px-6 max-sm:justify-between max-sm:px-0">
        <div className="flex flex-row items-center">
          <Link href={`/${locale}`}>
            <div className="mb-2 flex flex-col items-center leading-none tracking-wide">
              <div className="w-fit text-center font-CloisterBlack text-[3.4rem] text-white">
                Staatslieden
              </div>
              <div className="text-[0.65rem] text-[#ffcb3b] retina:text-[0.6rem]">
                webapplicatie voor de Staatsliedenbuurt Amsterdam
              </div>
            </div>
          </Link>
        </div>

        <div className="flex w-[350px] flex-row items-center justify-between max-md:justify-end">
          <div className="max-md:hidden">
            <LoginRegisterLogout />
          </div>

          <Link href="/weatherreport" className="max-md:hidden">
            <Weatherreport />
          </Link>

          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
