import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import placeholderImage from "../assets/images/placeholder-tailorlynk.png";

const MaterialProductCard = ({ materialID, materialPhoto, cardScrolls, materialName, price, materialCategory }) => {
  return (
    <Link to={`/product-detail/${btoa(materialID)}`} className="grid gap-2">
      <div
        className={`${
          cardScrolls === "true" ? "w-64 lg:w-full h-[150px]" : "w-full h-[250px] md:h-[150px]"
        } rounded-lg overflow-hidden bg-brandGreen/10`}
      >
        <img src={materialPhoto === null ? placeholderImage : materialPhoto} alt="brand_image" className={`${cardScrolls === "true" ? "w-64 lg:w-full h-[150px]" : "w-full h-[250px] md:h-[150px]"} object-cover`}/>
      </div>
      <div className="truncate">
        <div className="line-clamp-1 mb-1">{materialName}</div>
        <div><span className="font-bold secondary-font">{price}</span> <span className={`${materialCategory === "Western" ? "hidden" : ""} text-xs font-medium `}>/ yard</span></div>
      </div>
    </Link>
  );
};

export default MaterialProductCard;
