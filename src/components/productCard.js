import starIcon from "../assets/icons/star.svg";

const ProductCard = ({vendorName, vendorLocation, cardScrolls}) => {
    const img1 = "https://plus.unsplash.com/premium_photo-1670871853624-87056a19a28f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    return ( 
        <div className="grid gap-2">
          <div className={`${cardScrolls === "true" ? "w-64 lg:w-full h-[150px]" : "w-full h-[250px] md:h-[150px]"}  rounded-lg overflow-hidden relative`}>
             <img src={img1} alt="" className="h-full w-full object-cover"/>
             <div className={`${cardScrolls === "true" ? "w-64 lg:w-full h-[150px]" : "w-full h-[250px] md:h-[150px]"} absolute top-0 flex justify-end items-end p-2 hover:bg-black/10 transition-all cursor-pointer`}>
              <div className="p-2 rounded-md bg-white/5 backdrop-blur-md flex items-center gap-1 text-white">
                <img src={starIcon} alt="" className="h-3"/>
                <span className="font-semibold text-xs mt-[2px]">3.9</span>
              </div>
             </div>
          </div>
          <div className="">
              <div className="line-clamp-1"> {vendorName} </div>
              <div className="text-[13px] text-gray-400"> {vendorLocation} </div>
          </div>
        </div>
     );
}
 
export default ProductCard;