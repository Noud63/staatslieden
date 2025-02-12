import React from "react";
import AllCharts from "@/components/hoofdmenu/AllCharts";

const DemografiePage = () => {
  return (
    <div className="mt-8 px-6 text-white max-sm:mt-4 max-sm:px-4">
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide">
        <span className="px-4 pb-4">Demografie</span>
      </div>
      <div className="border-b-2 py-8 pl-4">
        <p>
          Hier vindt je de demografische gegevens van de wijk.
          <br />
          Maar wat is demografie eigenlijk? <br />
          Demografie is bevolkingsonderzoek of bevolkingsleer. <br />
          Demografie onderzoekt hoe een bevolkingsgroep (gemeenschap) is
          samengesteld.
          <br />
          Hierbij wordt gekeken naar bijvoorbeeld leeftijd, geslacht,
          nationaliteit, etniciteit, opleidingsniveau, burgerlijke staat en
          beroep. <br />
          Hierbij heb je ook te maken met sociale wetenschappen als geografie,
          sociologie, antropologie en geschiedenis, maar ook exacte
          wetenschappen als statistiek en wiskunde.
          <br />
          Beweeg met je muis over het diagram voor de exacte aantallen of percentages per
          jaar.
        </p>
      </div>

      <AllCharts />
    </div>
  );
};

export default DemografiePage;
