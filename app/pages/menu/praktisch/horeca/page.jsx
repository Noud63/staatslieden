import React from "react";
import Horeca from "@/components/praktisch/Horeca";

const HorecaPage = () => {
  return (
    <div className="mt-8">
      <div className="rounded-md bg-white py-2 pl-4 text-lg font-semibold text-yellow-700">
        <span className="font-bold">Horeca</span>
      </div>
      <div className="py-8 pl-4 max-xsm:pl-2">
        <p>
          Hier vindt je alle horecagelegenheden zoals restaurants en
          café&apos;s.
        </p>
      </div>
      <Horeca />
    </div>
  );
};

export default HorecaPage;
