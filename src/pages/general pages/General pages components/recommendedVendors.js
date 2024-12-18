import { Link } from "react-router-dom";
import ProductCard from "../../../components/productCard";

const RecommendedVendors = () => {
    return ( 
        <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <div className="font-bold secondary-font">Recommended <span className="text-primary">Tailors</span></div>
                <Link to={"/all-products"} className="text-xs opacity-60">[ View all tailors ]</Link>
            </div>
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 w-full gap-4">
              <ProductCard vendorName={"Silhouette Tailoring"} vendorLocation={"Lagos, Nigeria"} cardScrolls={"true"}/>
              <ProductCard vendorName={"Sewing by Lola"} vendorLocation={"Ibadan, Nigeria"} cardScrolls={"true"} />
              <ProductCard vendorName={"Agbada specialist"} vendorLocation={"Ogun, Nigeria"} cardScrolls={"true"} />
              <ProductCard vendorName={"Sew simple"} vendorLocation={"Lagos, Nigeria"} cardScrolls={"true"} />
            </div>
        </div>
     );
}
 
export default RecommendedVendors;