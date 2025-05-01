import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Historie = () => {

      const t = useTranslations("historie");

  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-white py-2 text-yellow-900 max-xsm:text-xl">
        <span className="px-4 text-xl font-semibold max-xsm:text-[16px]">
          {t("titel")}
        </span>
      </div>

      <div className="mx-auto w-full max-w-[960px] max-xl:max-w-full">
        <div className="mb-4 mt-4 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-lg shadow-lg max-xsm:text-base">
          Intro
        </div>
        <p className="mt-4 text-lg text-white max-xsm:text-base">
          {t.raw("content_a1")}
        </p>
        <br />

        <div className="mb-4 mt-8 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-lg shadow-lg max-xsm:text-base">
          {t("subtitel")}
        </div>

        <p className="mt-4 text-lg text-white max-xsm:text-base">
          {t.raw("content_a2")}
        </p>

        <div className="mt-4 border-8 border-white">
          <Image
            src="/images/sloten_amsterdam.png"
            alt="Staatsliedenbuurt"
            width={960}
            height={0}
            className="h-auto w-full shadow-lg"
          />

          <div className="bg-white pt-2 text-sm text-yellow-950">
            <span> {t("kaart")}</span>
          </div>
        </div>

        <p className="mt-4 text-lg text-white">
         
        </p>
      </div>
    </>
  );
};

export default Historie;
