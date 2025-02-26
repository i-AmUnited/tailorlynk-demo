import { Link } from "react-router-dom";
import starIcon from "../assets/icons/star.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import placeholderImage from "../assets/images/placeholder-tailorlynk.png";

const ProductCard = ({ vendorID, vendorName, vendorLocation, coverPhoto, cardScrolls }) => {
  return (
    <Link to={`/tailor-profile/${btoa(vendorID)}`} className="grid gap-2">
      <div
        className={`${
          cardScrolls === "true" ? "w-64 lg:w-full h-[150px]" : "w-full h-[250px] md:h-[150px]"
        } rounded-lg overflow-hidden relative bg-brandGreen/10`}
      >
        <LazyLoadImage
          src={coverPhoto}
          effect="blur"
          alt=""
          placeholderSrc={placeholderImage}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex justify-end items-end p-2 hover:bg-black/10 transition-all cursor-pointer">
          <div className="p-2 rounded-md bg-white/5 backdrop-blur-md flex items-center gap-1 text-white">
            <img src={starIcon} alt="" className="h-4" />
            <span className="font-bold text-[12px] mt-[2px]">3.9</span>
          </div>
        </div>
      </div>
      <div>
        <div className="line-clamp-1">{vendorName}</div>
        <div className="text-[13px] text-gray-400">{vendorLocation}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
