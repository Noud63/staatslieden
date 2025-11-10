import React from 'react'
import TitleBar from '@/components/TitleBar'

const Werk = () => {
  return (
    <div className="mt-8">
        <TitleBar title="Werk" titleWidth={"ml-2 font-bold"} id="werk" />
        <p className="ml-4 mt-4">
          <span className="mt-2 font-semibold">Werk zoeken </span>
          <br />
          Als u werk zoekt en niet zo goed weet waar u moet beginnen, dan kunt u
          terecht bij het buurteam.
          <br />
          Of u nu jong of oud bent, een uitkering heeft of niet.
          <br />
          Misschien wilt u weten hoe u een sollicitatiegesprek voert. Of een
          bedrijf starten met een uitkering.
          <br />
          Zo is er voor iedereen veel informatie over het zoeken naar werk in
          Amsterdam.
          <br />
          Het buurtteam kijkt samen met u naar de beste mogelijkheden en helpt u
          op weg.
          <br />
          Als u uw baan verliest door ontslag of arbeidsongeschiktheid, schrijft
          u zich in bij het UWV.<br />
          Dat geldt ook als u tijdelijk niet kunt werken
          door zwangerschap of ziekte.
          <br />
          Op de website van het UWV staat informatie over elk van deze
          situaties.
          <br />
          Via de website kunt u zich inschrijven als werkzoekende. Of een
          WW-uitkering aanvragen.
          <br />
          Heeft u vragen? Twijfel niet en neem contact op met het buurtteam in
          uw wijk om uw situatie te bespreken.
        </p>
      </div>
  )
}

export default Werk