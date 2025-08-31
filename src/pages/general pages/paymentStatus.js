import Lottie from "lottie-react";
import animationData from "../../assets/images/success icon.json"
import Button from "../../components/button";

const PaymentStatus = () => {
    return ( 
        <div className="flex justify-center mb-5">
            <div className="text-center">
                <Lottie animationData={animationData} className="size-64 justify-self-center"/>
                <div className="secondary-font font-bold text-[15px] mb-2">Thank you for shopping at <span className="text-primary">tailorlynk.com</span></div>
                <div className="text-xs">Your order has been placed and is being processed.</div>
                <div className="mt-10">
                  <Button buttonRole={"link"} destination={"/"} buttonText={"Continue shopping"} otherStyles={"bg-primary text-white"}/>
                </div>
            </div>
        </div>
     );
}
 
export default PaymentStatus;