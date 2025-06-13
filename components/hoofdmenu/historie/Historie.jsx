import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import TitleBar from "@/components/TitleBar";

const Historie = () => {
  const t = useTranslations("historie");

  return (
    <>
      <TitleBar title={t("titel")} />

      <div className="mx-auto w-full max-w-[960px] max-xl:max-w-full">
        <div className="mb-4 mt-4 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-lg shadow-lg max-xsm:text-base">
          Intro
        </div>
        <p className="mt-4 text-lg text-white max-xsm:text-base">
          {t.raw("content_a1")}
        </p>
        <br />

        <div className="mb-4 mt-4 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-lg shadow-lg max-xsm:text-base">
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

          <div className="bg-white pt-2 text-base text-yellow-950">
            <span> {t("kaart")}</span>
          </div>
        </div>

        <div className="mt-4 text-lg text-white">
          <p>{t.raw("content_a3").slice(0, 5)}</p>
          <p>{t.raw("content_a3").slice(5, 10)}</p>
          <p>{t.raw("content_a3").slice(10, t.raw("content_a3").length)}</p>
        </div>

        <div className="mb-4 mt-8 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-lg shadow-lg max-xsm:text-base">
          Moderne tijd
        </div>

        <div className="mt-4 text-lg text-white">
          <p>{t.raw("content_a4").slice(0, 4)}</p>
          <p>{t.raw("content_a4").slice(4, t.raw("content_a4").length)}</p>
        </div>

        <div className="mt-4 text-lg text-white">
          <p>{t.raw("content_a5")}</p>
        </div>

        <div className="mt-4 text-lg text-white">
          <p>{t.raw("content_a6")}</p>
        </div>
      </div>
    </>
  );
};

export default Historie;
