import { Link } from "react-router-dom";
import ProductCard from "../../../components/productCard";
import { useVendorList } from "../../reuseableEffects";

const RecommendedVendors = () => {
    const vendorList = useVendorList();

    const recommendedVendors = [...vendorList]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="font-bold secondary-font">
            Recommended <span className="text-primary">Tailors</span>
          </div>
          <Link to={"/all-products"} className="text-xs opacity-60">
            [ View all tailors ]
          </Link>
        </div>
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 w-full gap-4">
          {recommendedVendors.map((vendor) => (
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
      </div>
    );
}
 
export default RecommendedVendors;