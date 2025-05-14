import { useMaterialList } from "../reuseableEffects";
import ProductCard from "../../components/productCard";
import westernImageSample from "../../assets/images/western.png";
import featuredProductImage from "../../assets/images/image 3.jpg";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinners/Spinner";
import MaterialProductCard from "../../components/materialProductCard";
// import { Link } from "react-router-dom";

const Western = () => {
  const loading = useSelector((state) => state.user.loading);

  const listMaterial = useMaterialList();
  const westernMaterials = listMaterial.filter(
    (item) => item.category?.toLowerCase() === "western"
  );


  return (
    <div className="grid gap-10">
      <div className="border h-[550px] md:h-[350px] relative rounded-md overflow-hidden">
        <img
          src={westernImageSample}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-0 p-10 bg-gradient-to-t from-black/80 to-black/0 w-full h-full flex items-end pb-16 md:pb-10">
          <div className="grid gap-4 w-full md:w-2/3 text-pretty text-white text-center md:text-start">
            <p className="text-2xl md:text-xl secondary-font font-bold">
              Your Style. Your Story. <br></br> Your Wardrobe Awaits.
            </p>
            <p className="text-xs leading-5">
            Discover a world of fashion that speaks your language—from everyday essentials to standout pieces. Whether you're dressing up or keeping it casual, we bring you curated collections that celebrate your individuality, confidence, and flair. Because great style isn’t just about what you wear—it’s about how you feel.
            </p>
          </div>
        </div>
      </div>
      {/* Recommended */}
      <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-4">
            <div className="lg:col-span-1">
              <img
                alt=""
                src={featuredProductImage}
                className="aspect-square w-full object-cover rounded-lg"
              />
             
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-4">
                <span className="text-[10px] text-primary bg-primary/10 w-fit p-2 rounded">Featured</span>
                <span className="font-bold secondary-font"> Sample recommended dress name </span>
                <div className="grid ">
                <div className="text-xs font-semibold">Vendor</div>
                <div className=" text-primary underline cursor-pointer">iAmUnited Vendor</div>
              </div>
              </div>
              <div className="grid gap-1 mt-4 mb-6">
                <div className="text-xs font-semibold">Product description</div>
                <div className="text-xs leading-5 line-clamp-2">Elegance, culture, and style—this month's fashion inspiration is a tribute to the richness of African heritage. From bold prints to intricate designs, every outfit tells a story of tradition and modern sophistication.</div>
              </div>
              <div>
              <div className="grid">
                <div className="text-xs font-semibold">Price</div>
                <div className=" secondary-font font-bold">24,000.00</div>
              </div>
              </div>
            </div>
          </div>
      </div>
      {/*  */}
      <div>
        <p className="mb-4 font-bold secondary-font">Explore <span className="text-primary">Western</span> Styles</p>
        {loading ? (
          <div className="flex items-center gap-4">
              <Spinner />
              <div className="text-md font-bold text-[#c4c4c4]">loading styles, please wait...</div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {westernMaterials.map((product) => (
            <MaterialProductCard 
                key={product.materialId}
                materialName={product.materialName}
                materialPhoto={product.materialImageOne}
                materialID={product.materialId}
                price={product.price}
                materialCategory = {product.category}
            />
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Western;
