import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Historie = () => {

      const t = useTranslations("historie");

  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-white py-2 text-yellow-900 max-xsm:text-xl">
        <span className="px-4 text-xl font-semibold">{t("titel")}</span>
      </div>

      <div className="mx-auto w-full max-w-[960px] max-xl:max-w-full">
        <div className="mb-4 mt-8 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-base shadow-lg">
          Intro
        </div>
        <p className="mt-4 text-lg text-white">{t.raw("content_a2")}</p>
        <br />

        <div className="mb-4 mt-8 flex w-full items-center justify-between rounded-md border-b-2 border-yellow-900 bg-yellow-700 px-4 py-2 text-base shadow-lg">
          In den beginne
        </div>

        <p className="mt-4 text-lg text-white">{t.raw("content_a2")}</p>

        <div className="mt-4 border-8 border-white">
          <Image
            src="/images/sloten_amsterdam.png"
            alt="Staatsliedenbuurt"
            width={960}
            height={0}
            className="h-auto w-full shadow-lg"
          />

          <div className="bg-white pt-2 text-sm text-yellow-950">
            <span>Kaart situatie rond 1895</span>
          </div>
        </div>

        <p className="mt-4 text-lg text-white">
          Als het gaat om de historie van de Staatsliedenbuurt is de vraag waar
          begint die geschiedenis. Waar moet je beginnen met dat verhaal? Zeker
          gezien de geografische ligging van de Staatsliedenbuurt in het gebied
          dat behoorde tot de vroegere gemeente Sloten, verdient de periode voor
          de annexatie (1877-1896-1921) door Amsterdam, toen Sloten zijn
          zelfstandigheid en grond verloor aan Amsterdam, hier zeker aandacht.
        </p>
      </div>
    </>
  );
};

export default Historie;
