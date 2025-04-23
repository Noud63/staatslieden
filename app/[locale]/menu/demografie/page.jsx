import React from "react";
import AllCharts from "@/components/hoofdmenu/AllCharts";
import { useTranslations } from "next-intl";

const DemografiePage = () => {
    const t = useTranslations("demografie");
  return (
    <div className="mt-8 px-6 text-white max-sm:mt-4 max-sm:px-4">
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide">
        <span className="px-4 pb-4">{t("titel")}</span>
      </div>
      <div className="whitespace-pre-line border-b-2 py-8 pl-4">
        {t.raw("desc")}
      </div>

      <AllCharts />
    </div>
  );
};

export default DemografiePage;
