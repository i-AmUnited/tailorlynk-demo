import { Link } from "react-router-dom";
import ProductCard from "../../../components/productCard";
import { useMaterialList } from "../../reuseableEffects";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinners/Spinner";
import { useEffect, useState } from "react";
import MaterialProductCard from "../../../components/materialProductCard";

const RecommendedMaterials = () => {
    const listMaterial = useMaterialList();
    
    const [recommendedMaterials, setRecomendedMaterials] = useState([]);
// console.log(recommendedMaterials)
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        const availableMaterials = listMaterial.filter(
          (item) => item.availability === "AVAILABLE" &&
          item.category === "Material"
        );
        const selected = availableMaterials.slice(0, 4);
      
        setRecomendedMaterials(selected);
      }, [listMaterial]);

    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="font-bold secondary-font">
            Explore <span className="text-primary">Materials</span>
          </div>
          <Link to={"/all-materials"} className="text-xs text-black/50 hover:text-primary">
            [ View all materials ]
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center gap-4">
              <Spinner />
              <div className="text-md font-bold text-[#c4c4c4]">loading styles, please wait...</div>
          </div>
        ) : (
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 w-full gap-4">
            {recommendedMaterials.map((material) => (
              
              <MaterialProductCard 
                key={material.materialId}
                materialName={material.materialName}
                materialPhoto={material.materialImageOne}
                materialID={material.materialId}
                price={material.costPerYard}
                cardScrolls={"true"}
              />
            ))}
          </div>
        )}
      </div>
    );
}
 
export default RecommendedMaterials;