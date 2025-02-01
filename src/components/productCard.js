import { Link } from "react-router-dom";
import starIcon from "../assets/icons/star.svg";

const ProductCard = ({vendorName, vendorLocation, rating, coverPhoto, vendorID, cardScrolls}) => {

    return ( 
        <Link to={`/tailor-profile/${btoa(vendorID)}`} className="grid gap-2">
          <div className={`${cardScrolls === "true" ? "w-64 lg:w-full h-[150px]" : "w-full h-[250px] md:h-[150px]"}  rounded-lg overflow-hidden relative bg-brandGreen/10`}>
             <img src={coverPhoto} alt="" className="h-full w-full object-cover"/>
             <div className={`${cardScrolls === "true" ? "w-64 lg:w-full h-[150px]" : "w-full h-[250px] md:h-[150px]"} absolute top-0 flex justify-end items-end p-2 hover:bg-black/10 transition-all cursor-pointer`}>
              <div className="p-2 rounded-md bg-white/5 backdrop-blur-md flex items-center gap-1 text-white">
                <img src={starIcon} alt="" className="h-3"/>
                <span className="font-semibold text-xs mt-[2px]">{rating}</span>
              </div>
             </div>
          </div>
          <div className="md:truncate">
              <div className="line-clamp-1 truncate"> {vendorName} </div>
              <div className="text-xs font-light text-gray-400 md:truncate"> {vendorLocation}</div>
          </div>
        </Link>
     );
}
 
export default ProductCard;