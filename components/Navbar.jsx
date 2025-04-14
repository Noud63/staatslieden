import React from 'react'
import Link from 'next/link';
import Weatherreport from './Weatherreport';
import LoginRegisterLogout from './LoginRegisterLogout';
import TranslateButton from './TranslateButton';

const Navbar = () => {

return (
  <div className="navbar flex h-[100px] w-full justify-between border-b border-yellow-800 py-3 max-sm:px-4">
    <div className="mx-auto flex w-full max-w-[1980px] flex-row items-center justify-between px-6 max-sm:justify-between max-sm:px-0">
      <div className="flex flex-row items-center">
        <Link href="/">
          <div className="mb-2 flex flex-col leading-none tracking-wide">
            <div className="font-CloisterBlack text-[4rem] text-white max-xsm:text-[3.2rem]">
              Staatslieden
            </div>
            <div className="text-[0.77rem] text-[#ffcb3b] retina:text-[0.72rem] max-xsm:text-[0.60rem]">
              webapplicatie voor de Staatsliedenbuurt Amsterdam
            </div>
          </div>
        </Link>
      </div>

      <TranslateButton />

      <div className="flex max-md:hidden">
        <LoginRegisterLogout />

        <Link href="/pages/weatherreport" className="max-md:hidden">
          <Weatherreport />
        </Link>
      </div>
    </div>
  </div>
);
}

export default Navbar
