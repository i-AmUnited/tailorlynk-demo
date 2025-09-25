import { useSelector } from "react-redux";
import { useMaterialList } from "../../reuseableEffects";
import Spinner from "../../../components/Spinners/pageLoadingSpinner";
import MaterialProductCard from "../../../components/materialProductCard";
import { Link } from "react-router-dom";

const MaterialFeed = () => {
  const listMaterial = useMaterialList();
  const loading = useSelector((state) => state.user.loading);

  function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  const readyMade = listMaterial.filter((item) => item.category === "Ready_Made" && item.availability === "AVAILABLE");
  const filteredList = shuffle(readyMade).slice(0, 12);


  return (
    <div>
      <Spinner loading={loading} />
      <div className="grid md:flex items-center md:justify-between gap-4 mb-4">
        <div className="font-bold secondary-font">
            Recommended <span className="text-primary">Styles</span>
        </div>
        <Link to={"/all-materials"} className="text-xs text-black/50 hover:text-primary">
            [ View all styles ]
        </Link>
      </div>

     <div>{readyMade.length === 0 ? <span className="text-md font-bold text-[#c4c4c4]">We haven't added any styles yet</span> : <span></span>}</div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredList.map((material) => (
              <MaterialProductCard 
                key={material.materialId}
                materialName={material.materialName}
                materialPhoto={material.materialImageOne}
                materialID={material.materialId}
                price={material.price}
                materialCategory={material.category}
                vendorName={material.vendorData.businessName}
              />
              
            ))}
        </div>
    </div>
  );
};

export default MaterialFeed;
