import AllZorgInstanties from "@/components/praktisch/zorg/AlleZorgInstanties";

const ZorgPage = () => {

  return (
    <div className="mt-8">
      <div className="rounded-md bg-white py-2 pl-4 text-lg font-semibold text-yellow-900">
        <span className="font-bold">Zorg</span>
      </div>
      <div className="py-8 pl-4 max-xsm:pl-2">
        <p>
          Hier vindt je alle mogelijke zorginstellingen in de Staatsliedenbuurt
          zoals huisartsen, tandartsen en fysiotherapeuten.
        </p>
      </div>

        <AllZorgInstanties />
     
    </div>
  );
};

export default ZorgPage;
