import westernLanding from "../../assets/images/image 4.jpg";
import { useMaterialList } from "../reuseableEffects";
import ProductCard from "../../components/productCard";
import westernImageSample from "../../assets/images/image 5.jpg";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinners/Spinner";

const Western = () => {
  const loading = useSelector((state) => state.user.loading);

  const listMaterial = useMaterialList();
  const westernMaterials = listMaterial.filter(
    (item) => item.category?.toLowerCase() === "western"
  );

  return (
    <div className="grid gap-10">
      <div className="border h-[450px] md:h-[350px] relative rounded-lg overflow-hidden">
        <img
          src={westernLanding}
          alt=""
          className="h-full w-full object-cover object-right md:object-center"
        />
        <div className="absolute top-0 p-10 bg-black/10 w-full h-full flex items-end md:items-center pb-16 md:pb-0">
          <div className="grid gap-2 w-full md:w-2/3 text-pretty text-white text-center md:text-start">
            <p className="text-3xl md:text-4xl western-font">
              Explore Western Styles
            </p>
            <p>
              From sharp suits to elegant dresses, discover tailors who
              specialize in creating modern Western wear that fits and flatters.
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* <p className="mb-4 font-bold text-[14px] secondary-font">Explore</p> */}
        {loading ? (
          <div className="flex items-center gap-4">
              <Spinner />
              <div className="text-md font-bold text-[#c4c4c4]">loading vendors, please wait...</div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {westernMaterials.map((product) => (
            <ProductCard
              key={product.materialId}
              vendorName={product.materialName}
              vendorLocation={product.businessAddress}
              ratingSection={false}
              coverPhoto={product.materialImageOne}
              //   loadingPlaceholderImage={placeholderImage}
              vendorID={product.vendorId}
            />
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Western;
