import Lottie from "lottie-react";
import Button from "../../components/button";
import animationData from "../../assets/images/waiting sand.json"

const ComingSoon = () => {
    return ( 
        <div className="flex justify-center mb-5 ">
            <div className="text-center md:w-2/3">
                <Lottie animationData={animationData} className="size-64 justify-self-center"/>
                <div className="secondary-font font-bold text-[15px] mb-2">Coming Soon: <span className="text-primary">Tailors and Fabric Sellers</span></div>
                <div className="text-xs leading-5">We’re expanding TailorLynk beyond ready-made clothes! Soon, you’ll be able to hire trusted Nigerian tailors for custom outfits and shop authentic fabrics from verified sellers—all in one place..</div>
                <div className="mt-10">
                  <Button buttonRole={"link"} destination={"/"} buttonText={"Continue shopping"} otherStyles={"bg-primary text-white"}/>
                </div>
            </div>
        </div>
     );
}
 
export default ComingSoon;