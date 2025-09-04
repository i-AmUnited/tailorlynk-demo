import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import placeholderImage from "../assets/images/fallbackProductImage.png";

const MaterialProductCard = ({ materialID, materialPhoto, cardScrolls, materialName, vendorName, price, materialCategory }) => {
  return (
    <Link to={`/product-detail/${btoa(materialID)}`} className="grid gap-2">
      <div
        className={`${
          cardScrolls === "true"
            ? "w-64 lg:w-full h-[150px]"
            : "w-full h-[250px] md:h-[150px]"
        } rounded-lg overflow-hidden bg-brandGreen/10`}
      >
        {/* <img src={materialPhoto === null ? placeholderImage : materialPhoto} alt="brand_image" className={`${cardScrolls === "true" ? "w-64 lg:w-full h-[150px]" : "w-full h-[250px] md:h-[150px]"} object-cover`}/> */}

        <img
          src={materialPhoto}
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
          alt="brand_image"
          className={`${
            cardScrolls === "true"
              ? "w-64 lg:w-full h-[150px]"
              : "w-full h-[250px] md:h-[150px]"
          } object-cover`}
        />
      </div>
      <div className="truncate">
        <div className="line-clamp-1">{materialName}</div>
        <div className="line-clamp-1 mb-1 text-xs text-gray-400">
          By {vendorName}
        </div>
        <div>
          <span className="font-bold">£{price}</span>{" "}
          <span
            className={`${
              materialCategory === "Western" ||
              materialCategory === "Ready_Made"
                ? "hidden"
                : ""
            } text-xs font-medium `}
          ></span>
        </div>
      </div>
    </Link>
  );
};

export default MaterialProductCard;
