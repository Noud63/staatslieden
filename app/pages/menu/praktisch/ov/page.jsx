
import React from "react";
import AlleHaltesBus21 from "@/components/praktisch/AllehaltesBus21";
import AlleHaltesTram19 from "@/components/praktisch/AlleHaltesTram19";
import Tramlijn19 from "@/components/praktisch/Tramlijn19";
import Buslijn21 from "@/components/praktisch/Buslijn21";

const OvPage = () => {

  return (
    <div className="mt-8">
      <div className="rounded-md bg-white py-2 pl-4 text-lg font-semibold text-yellow-900">
        <span className="font-bold">Openbaar vervoer</span>
      </div>
      <div className="py-8 pl-4 max-xsm:pl-2">
        <p>
          Hier vindt je alle bus en tramlijnen van en naar de Staatsliedenbuurt
          met alle haltes. Het zijn er twee, te weten tramlijn 19 en buslijn 21.
        </p>
      </div>
      <div className="rounded-md bg-white py-2 pl-4 text-lg font-semibold text-yellow-900">
        <span className="font-bold">Tramlijnen</span>
      </div>
      <div className="pb-4 pl-4 pt-8 max-xsm:pl-0">
        <div className="mb-4 flex max-w-[330px] flex-row items-center border-b pb-2 max-xsm:max-w-full">
          <span className="text-lg font-semibold">Tramlijn</span>
          <div className="mx-2 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white pr-[2px] font-bold text-yellow-900">
            19
          </div>
        </div>

        <Tramlijn19 />

        <div>Route: Van Hallstraat - Diemen (Sniep)</div>
        <div>
          Voor actuele vertrektijden{" "}
          <a
            href="https://gvb.nl/reisinformatie/lijn/GVB/19"
            target="_blank"
            alt="lijn19"
            className="underline"
          >
            klik hier
          </a>
        </div>
      </div>

      <AlleHaltesTram19 />

      <div className="rounded-md bg-white py-2 pl-4 text-lg font-semibold text-yellow-900">
        <span className="font-bold">Buslijnen</span>
      </div>
      <div className="pb-4 pl-4 pt-8 max-xsm:pl-0">
        <div className="mb-4 flex max-w-[330px] flex-row items-center border-b pb-2 max-xsm:max-w-full">
          <span className="text-lg font-semibold">Buslijn</span>
          <div className="mx-2 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white pl-[1px] font-bold text-yellow-900">
            21
          </div>
        </div>

        <Buslijn21 />

        <div>Route: De Sav. Lohmanstraat - Centraal Station</div>
        <div>
          Voor actuele vertrektijden{" "}
          <a
            href="https://gvb.nl/reisinformatie/lijn/GVB/21"
            target="_blank"
            alt="lijn21"
            className="underline"
          >
            klik hier
          </a>
        </div>
      </div>

      <AlleHaltesBus21 />
    </div>
  );
};

export default OvPage;
