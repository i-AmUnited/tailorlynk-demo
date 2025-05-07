import westernFeatured from "../../assets/images/featured-western.jpg";
import { useMaterialList } from "../reuseableEffects";
import ProductCard from "../../components/productCard";
import westernImageSample from "../../assets/images/image 5.JPG";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinners/Spinner";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
          src={westernImageSample}
          alt=""
          className="h-full w-full object-cover object-right md:object-center"
        />
        <div className="absolute top-0 p-10 bg-black/50 w-full h-full flex items-end md:items-center pb-16 md:pb-0">
          <div className="grid gap-4 w-full md:w-2/3 text-pretty text-white text-center md:text-start">
            <p className="text-3xl md:text-4xl western-font">
              Elevate Your Wardrobe with the Timeless Elegance of Our Western Collection
            </p>
            <p>
              From classic denim to modern Western-inspired pieces, discover curated styles that bring sophistication and charm to every outfit.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
        <div className="lg:col-span-1">
          <img src={westernFeatured} alt="featured" className="rounded-md"/>
        </div>
        <div className="lg:col-span-2">
          <div className="w-fit text-xs md:text-[10px] font-medium bg-primary/20 text-primary px-3 py-2 rounded-md mb-5">Featured style</div>
          <div className="font-semibold mb-1">Stylish Modern Jacket</div>
          <div className="text-xs">Vendor: <span className="text-primary underline">Johnny Blaze</span></div>
          <div className="grid gap-1 my-5">
            <span className="font-medium">Description</span>
            <span className="text-xs">Elevate your everyday style with this sleek, modern jacket designed for both comfort and sophistication. Crafted from high-quality materials with a tailored fit, it’s perfect for layering and effortlessly transitions from day to night.</span>
          </div>
          <div className="grid gap-6 md:flex md:justify-between md:items-center">
            <div className="grid">
              <span className="font-medium">Price</span>
              <span className="font-bold text-[16px] secondary-font">24,000</span>
            </div>
            <div className="w-fit cursor-pointer text-xs py-5 md:py-4 px-8 rounded bg-primary text-white">View product</div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-4">
        <div className="font-semibold secondary-font">Explore <span className="text-primary">western</span> styles</div>
        {loading ? (
          <div className="flex items-center gap-4">
              <Spinner />
              <div className="text-md font-bold text-[#c4c4c4]">loading vendors, please wait...</div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {westernMaterials.map((product) => (
            <Link key={product.materialId} to={`/product-detail/${btoa(product.materialId)}`}>
            <div className="grid">
              <LazyLoadImage effect="blur" src={product.materialImageOne} alt={product.materialName} className="w-full aspect-video object-cover rounded-md" />
              <div className="line-clamp-none md:line-clamp-1 mt-1 font-semibold">{product.materialName}</div>
              <div className="text-xs mb-2">Vendor: <span className="text-primary underline">Johnny Blaze</span></div>
              <div className="font-bold secondary-font">{product.price}</div>
            </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Western;
