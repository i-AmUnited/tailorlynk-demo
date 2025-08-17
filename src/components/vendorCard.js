import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import placeholderImage from "../assets/images/placeholder-tailorlynk.png";

const VendorCard = ({ vendorID, vendorName, vendorLocation, coverPhoto,vendorRating }) => {
  
  return (
    // <Link to={`/tailor-profile/${btoa(vendorID)}`} className="grid gap-2">
      
      <div className="grid gap-2 w-24 h-32 pt-2 flex-shrink-0">
        <div className="flex justify-center"><img src={coverPhoto === null ? placeholderImage : coverPhoto} alt="brand_image" className="size-14 rounded-full object-cover outline outline-[4px] outline-primary/20"/></div>
        <div className="truncate text-center">
          <div className="line-clamp-1 text-xs truncate">{vendorName}</div>
          <div>
            {vendorRating >= "4.0" }
            <span>{vendorRating >= "4.0" ? "🔥" : "❤️‍🔥"}</span>
          </div>
          {/* <div className="text-[13px] text-gray-400 truncate">
            {vendorLocation}
          </div> */}
        </div>
      </div>
      
    // </Link>
  );
};

export default VendorCard;
