import React from 'react'
import Image from 'next/image'
import vinger from "../assets/icons/vinger.png"
import Link from 'next/link'

const LeesDit = () => {
  return (
    <div className="mx-6 mt-4 max-sm:mx-4 max-xsm:mx-2">
      <div className="mx-auto flex w-full max-w-[620px] rounded-lg border-2 border-white px-4 py-3">
        <div className="flex flex-row items-center gap-2 text-lg text-white max-sm:text-base">
          <span className="max-sm:hidden">Wil je een bericht plaatsen?</span>
          <span className="sm:hidden">Bericht posten?</span>
          <Image
            src={vinger}
            width={0}
            height={0}
            sizes="100vh"
            alt="vinger"
            className="h-[15px] w-[35px] max-xxsm:hidden"
          />
          <div className="border-b border-white">
            <Link href="/pages/leesditeerst">
              <div>Lees eerst even dit!</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeesDit
