import TitleBar from "@/components/TitleBar";

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
      <div className="ml-4">
        <p>
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
        </p>

        <p className="mt-4">
          U vindt ons in Huis van de Buurt Koperen Knoop.
          <br />
          Onze buurtteammedewerkers helpen u graag.
          <br />
          Mail of bel ons voor een afspraak.
          <br />
          Adres : Van Limburg Stirumstraat 119 , 1051 BA
          <br />
          E-mail : aanmelden@​buurtteamamsterdamwest​.nl
          <br />
          Tel : 020 618 49 52
        </p>

        <div className="mt-4">
          Het buurtteam kan u bijstaan op het gebied van:
          <br />
          <ul className="ml-5 mt-2 cursor-pointer list-disc space-y-2 text-white">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="hover:underline"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <TitleBar
          title="Financiën"
          titleWidth={"ml-2 font-bold"}
          id="financien"
        />
        <p className="ml-4 mt-4">
          Iedereen kan met geldproblemen of schulden te maken krijgen.
          <br />
          Het is belangrijk om hier niet mee te blijven zitten. Schakel op tijd
          hulp in. Zo kunt u ergere problemen voorkomen.
          <br />
          Het buurtteam ondersteunt u daarbij. Samen met u kijken we naar uw
          geldzaken. En naar de mogelijkheden die het beste passen bij uw
          omstandigheden.
          <br />
          Soms blijkt bijvoorbeeld dat u recht heeft op een aanvulling van uw
          inkomen. Ook bij het aanvragen van voorzieningen staat het buurtteam u
          bij.
          <br />
          Hoe eerder u contact opneemt met een buurtteam, hoe beter wij kunnen
          helpen.
          <br />
          Kom langs en praat met één van onze medewerkers. Kijk waar u ons in de
          buurt kunt vinden.
        </p>

        <p className="ml-4 mt-4">
          <span className="mt-2 font-semibold">Energiecrisis?</span>
          <br />
          Kunt u alles nog betalen? Energie, boodschappen, alles wordt duurder.
          Het buurtteam helpt bij vragen over geld. Er is vaak meer mogelijk dan
          u denkt.
          <br />
          Onze hulp is gratis.
          <br />
          Wacht niet te lang en maak een afspraak.
        </p>
        <p className="ml-4 mt-4">
          <span className="mt-2 font-semibold">
            Te laat met betalen van uw huur?
          </span>
          <br />
          Bent u te laat met betalen van uw huur? Dan heeft u een
          huurachterstand.
          <br />
          Het is belangrijk om snel actie te ondernemen. Voordat het bedrag
          oploopt en u uit huis gezet kan worden. Het buurtteam kan u helpen.
          <br />
          Samen kijken we wat er als eerste moet gebeuren en wat u daarna kunt
          doen.
          <br />
          Ook als u te laat bent met betalen van andere rekeningen, kunt u bij
          het buurtteam terecht.
        </p>
      </div>
      <div className="mt-8">
        <TitleBar
          title="Huisvesting"
          titleWidth={"ml-2 font-bold"}
          id="huisvesting"
        />
        <div className="ml-4 mt-4">
          <p className="mb-4">
            Een fijne plek om te wonen is belangrijk voor uw gezondheid en uw
            welzijn.
            <br />
            Niet voor iedereen is dat het geval.
            <br />
            Bijvoorbeeld als u binnenkort uw huis uit moet. Of uw huis is niet
            geschikt. Of door een beperking moet het huis aangepast worden.
            <br />
            Het buurtteam denkt met u mee en helpt u verder.
            <br />
            Het buurtteam heeft geen woningen en kan zelf geen woonruimte
            regelen. We kunnen wel samen met u kijken naar wat u nodig heeft en
            wat mogelijk is.
          </p>
          <span className="mt-2 font-semibold">Langer thuis</span>
          <br />U bent 65+ en woont zelfstandig in uw huis en u wilt dat met de
          juiste steun blijven doen.
          <br />
          Het buurtteam kijkt graag samen met u hoe wij u het beste kunnen
          helpen met praktische zaken. Zodat u zich thuis goed kunt redden, in
          een woning die aansluit bij uw persoonlijke behoeften.
          <br />
          Bijvoorbeeld met een of meerdere aanpassingen aan uw woning. Of met
          hulp bij het huishouden of bij de administratie.
          <br />
          Er zijn veel mogelijkheden om het voor u in en rondom uw huis
          gemakkelijker te maken.
          <br />
          Het buurtteam kan u bijvoorbeeld ook helpen bij het aanvragen van een
          scootmobiel of een Wmo-taxi. Of bij de aanvraag van allerlei
          hulpmiddelen en aanpassingen om uw woning beter begaanbaar te maken.
          <br />
          Dat gaat via de ergotherapeut of de gemeente. Neem hiervoor contact op
          met uw buurtteam.
        </div>
      </div>
      <div className="mt-8">
        <TitleBar
          title="Gezondheid"
          titleWidth={"ml-2 font-bold"}
          id="gezondheid"
        />
      </div>
      <div className="mt-8">
        <TitleBar
          title="Administratie"
          titleWidth={"ml-2 font-bold"}
          id="administratie"
        />
        <p className="ml-4 mt-4">
          Heeft u steun nodig bij uw administratie? Het buurtteam staat voor u
          klaar.
          <br />
          Samen met u brengen we uw administratie en post op orde, zodat u een
          goed overzicht krijgt.
          <br />
        </p>
        <div className="ml-4 mt-4">
          <span className="mt-2 font-semibold">Uw geldzaken op orde</span>
          <br />
          Het buurtteam kan u ook helpen om een overzicht te maken van uw
          financiën. Dat gaat zo:
          <br />
          <ul className="ml-5 mt-2 list-disc">
            <li>Samen kijkt u alle post na. Ook oude en ongeopende brieven.</li>
            <li>
              Als het nodig is, maakt u samen een overzicht met inkomsten en
              uitgaven.
            </li>
            <li>We maken een lijst met betalingen die gedaan moeten worden.</li>
            <li>En we zetten andere taken die moeten gebeuren op een rij.</li>
            <li>En we zetten andere taken die moeten gebeuren op een rij.</li>
          </ul>
        </div>
        <p className="ml-4 mt-4">
          Dat lucht op en geeft een goede start. Zo krijgt u stap voor stap weer
          de controle over uw geldzaken.
        </p>
        <p className="ml-4 mt-4">
          <span className="mt-2 font-semibold">
            Wat moet u meenemen naar uw afspraak?
          </span>
          <br />
          Neem zoveel mogelijk mee. Dan gaan we het samen ordenen.
          <br />
          Een DigiD heeft u nodig om allerlei zaken te regelen die met de
          overheid te maken hebben.
          <br />
          Zoals een toeslag of uitkering aanvragen of aangifte
          inkomstenbelasting doen.
        </p>
      </div>

      <div className="mt-8">
        <TitleBar title="Werk" titleWidth={"ml-2 font-bold"} id="werk" />
        <p className="ml-4 mt-4">
          <span className="mt-2 font-semibold">Werk zoeken </span>
          <br />
          Als u werk zoekt en niet zo goed weet waar u moet beginnen, dan kunt u
          terecht bij het buurteam.< br />
          Of u nu jong of oud bent, een uitkering
          heeft of niet.<br />
          Misschien wilt u weten hoe u een sollicitatiegesprek
          voert. Of een bedrijf starten met een uitkering.<br />
          Zo is er voor
          iedereen veel informatie over het zoeken naar werk in Amsterdam.<br />
          Het
          buurtteam kijkt samen met u naar de beste mogelijkheden en helpt u op
          weg.<br />
          Als u uw baan verliest door ontslag of arbeidsongeschiktheid,
          schrijft u zich in bij het UWV. Dat geldt ook als u tijdelijk niet
          kunt werken door zwangerschap of ziekte.<br />
          Op de website van het UWV
          staat informatie over elk van deze situaties.<br />
          Via de website kunt u
          zich inschrijven als werkzoekende. Of een WW-uitkering aanvragen.<br />
          Heeft u vragen? Twijfel niet en neem contact op met het buurtteam in
          uw wijk om uw situatie te bespreken.
        </p>
      </div>

      <div className="mt-8">
        <TitleBar
          title="Ontmoeten"
          titleWidth={"ml-2 font-bold"}
          id="ontmoeten"
        />
      </div>

      <div className="mt-8">
        <TitleBar title="Zorg" titleWidth={"ml-2 font-bold"} id="zorg" />
      </div>

      <div className="mt-8">
        <TitleBar
          title="Veiligheid"
          titleWidth={"ml-2 font-bold"}
          id="veiligheid"
        />
      </div>
    </div>
  );
};

export default BuurtTeam;
