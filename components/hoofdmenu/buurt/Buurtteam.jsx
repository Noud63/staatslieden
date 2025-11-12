import TitleBar from "@/components/TitleBar";
import Financien from "./Financien";
import Huisvesting from "./Huisvesting";
import Gezondheid from "./Gezondheid";
import Administratie from "./Administratie";
import Werk from "./Werk";
import Ontmoeten from "./Ontmoeten";
import Zorg from "./Zorg";
import Veiligheid from "./Veiligheid";

const BuurtTeam = () => {
  const items = [
    { label: "Financiën", id: "financien" },
    { label: "Huisvesting", id: "huisvesting" },
    { label: "Gezondheid", id: "gezondheid" },
    { label: "Administratie", id: "administratie" },
    { label: "Ontmoeten", id: "ontmoeten" },
    { label: "Zorg", id: "zorg" },
    { label: "Werk", id: "werk" },
    { label: "Veiligheid", id: "veiligheid" },
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="my-4 text-lg text-white max-xsm:text-base">
      <section className="ml-4">
        <div>
          Het buurtteam is een plek in de buurt waar u naartoe kunt met uw
          vragen.
          <br />
          Bijvoorbeeld als u moeite heeft om rond te komen, meer sociale
          contacten wilt, of zo lang mogelijk zelfstandig thuis wil blijven
          wonen.
          <br />
          Allerlei vragen waar het buurtteam u gratis bij kan helpen. Samen
          kijken we wat u nodig heeft, zodat u zelf weer verder kunt.
          <br />
          De werkwijze hangt af van uw vragen en uw persoonlijke situatie. We
          kijken wat u zelf kan doen en hoe uw directe omgeving kan helpen.
          <br />
          Het buurtteam kijkt samen met u wat er aan de hand is en wat er nodig
          is.
        </div>

        <div className="mt-4">
          U vindt ons in Huis van de Buurt Koperen Knoop.
          <br />
          Onze buurtteammedewerkers helpen u graag.
          <br />
          Mail of bel ons voor een afspraak.
          <br />
          <div className="mt-4">Adres : Van Limburg Stirumstraat 119 , 1051 BA
          <br />
          E-mail : aanmelden@​buurtteamamsterdamwest​.nl
          <br />
          Tel : 020 618 49 52
          </div>
        </div>

        <div className="mt-4">
          <div className="border-b border-yellow-800 w-full rounded-md bg-yellow-700 px-4 py-2 text-lg shadow-lg">Het buurtteam kan u bijstaan op het gebied van :</div>
          <br />
          <ul className="ml-5 cursor-pointer list-disc space-y-2 text-yellow-900 w-full max-w-[200px]">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="hover:underline text-white bg-white w-[200px] rounded-md py-1"
              >
                <span className="text-yellow-950 pl-2 font-semibold text-base">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Financien />

      <Huisvesting />

      <Gezondheid />

      <Administratie />

      <Ontmoeten />

      <Zorg />

      <Werk />

      <Veiligheid />

     </div>
  );
};

export default BuurtTeam;
