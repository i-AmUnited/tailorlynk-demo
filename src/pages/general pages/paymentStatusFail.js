import Lottie from "lottie-react";
import animationData from "../../assets/images/success icon.json"
import Button from "../../components/button";
import { useSelector } from "react-redux";

const PaymentStatusFail = () => {
    const userSessionData = useSelector((state) => state.user.userSession);
    return ( 
        <div className="flex justify-center mb-5">
            <div className="text-center">
                <Lottie animationData={animationData} className="size-64 justify-self-center"/>
                <div className="secondary-font font-bold text-[15px] mb-2">Payment failed!</div>
                <div className="text-xs">We couldn't process your payment. Please return to your cart and choose another payment method.</div>
                <div className="mt-10">
                  <Button buttonRole={"link"} destination={userSessionData ? "/user-cart" : "/cart"} buttonText={"Back to home"} otherStyles={"bg-primary text-white"}/>
                </div>
            </div>
        </div>
     );
}
 
export default PaymentStatusFail;