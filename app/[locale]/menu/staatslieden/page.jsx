import React from "react";
import straatnamen from "@/data/straatnamen.json";

const StaatsliedenPage = () => {
  //If you only need the href's keys from the array
  // const hrefs = straatnamen.map((obj) => ({href: obj.href}))
  // console.log("Hrefs:", hrefs)

  return (
    <div className="w-full max-w-[1280px] mx-auto mt-8 px-4 text-white max-md:mt-4 max-sm:mt-4 max-sm:px-4">
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide">
        <div className="px-4 pb-4">De Staatslieden</div>
      </div>

      <div className="mt-4 mb-6">
        De staasliedenbuurt kent 36 straten.
        <br />
        Alle straatnamen zijn vernoemd naar Nederlandse staatslieden uit de 18e
        en 19e eeuw.
        <br />
        Maar wie waren die hoge heren en wat was hun functie?
        <br />
        Hieronder een lijst van alle straatnamen.
        <br />
        Klik op een naam voor een korte kennismaking met de persoon naar wie de
        straat genoemd is en de locatie op de plattegrond.
      </div>

      <div className="">
       
        {/* <ul className="w-full max-w-[220px] cursor-pointer list-disc space-y-2 text-yellow-900 "> */}
          <div className="mt-4 grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-2">
          {straatnamen &&
            straatnamen.map((naam) => (
              <div
                key={naam.naam}
                className="rounded-md bg-white py-1 pl-2 font-semibold text-white decoration-yellow-800 hover:underline cursor-pointer"
              >
                {/* <a href={naam.href} target="_blank"><span className="text-yellow-900">{naam.naam}</span></a> */}
                <span className="text-yellow-900">{naam.naam}</span>
              </div>
            ))}
            </div>
        {/* </ul> */}
      </div>
    </div>
  );
};

export default StaatsliedenPage;
