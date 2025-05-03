import { Link } from "react-router-dom";
import ProductCard from "../../../components/productCard";
import { useMaterialList, useVendorList } from "../../reuseableEffects";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinners/Spinner";
import { useEffect, useState } from "react";

const RecommendedMaterials = () => {
    const listMaterial = useMaterialList();
    const [recommendedMaterials, setRecomendedMaterials] = useState([]);

    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        const availableMaterials = listMaterial.filter(
          (item) => item.availability === "AVAILABLE" &&
          item.category?.toLowerCase() !== "Western"
        );
      
        const shuffled = [...availableMaterials].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
      
        setRecomendedMaterials(selected);
      }, [listMaterial]);

    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="font-bold secondary-font">
            Explore <span className="text-primary">Ready-made</span> styles
          </div>
          <Link to={"/all-products"} className="text-xs text-black/50 hover:text-primary">
            [ View all styles ]
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center gap-4">
              <Spinner />
              <div className="text-md font-bold text-[#c4c4c4]">loading materials, please wait...</div>
          </div>
        ) : (
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 w-full gap-4">
            {recommendedMaterials.map((vendor) => (
              <ProductCard
                key={vendor.vendorId}
                vendorName={vendor.businessName}
                vendorLocation={vendor.businessAddress}
                rating={vendor.rating}
                coverPhoto={vendor.brandLogo}
                vendorID={vendor.vendorId}
                cardScrolls={"true"}
              />
            ))}
          </div>
        )}
      </div>
    );
}
 
export default RecommendedMaterials;