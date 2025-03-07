import { useFormik } from "formik";
import { useCart } from "../../components/cartContext";
import Back from "../../components/goBack";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../hooks/local/reducer";
import { useEffect, useState } from "react";

const Checkout = () => {
  const { cart } = useCart();
  const dispatch = useDispatch();

  const userSessionData = useSelector((state) => state.user.userSession);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!userSessionData);
  }, [userSessionData]);

  const totalCost = cart.reduce((sum, item) => 
    sum + ((parseFloat(item.cost.toString().replace(/,/g, "")) || 0) * (Number(item.quantity) || 1)), 
    0
  );
  
  const formattedTotalCost = totalCost.toLocaleString("en-US", { minimumFractionDigits: 2 });
  

  // const customerID = userSessionData
  const phone = userSessionData?.data?.customerData?.phoneNumber || "";
  const email = userSessionData?.data?.customerData?.emailAddress || "";
  const fullName = userSessionData?.data?.customerData?.fullName || "";
  const [firstName, ...lastNameParts] = fullName.split(" ");
  const lastName = lastNameParts.join(" "); 


  const createOrder = useFormik({
          initialValues: {
            is_signed_in: isSignedIn,
            customer_id: "",
            create_account: "",
            email_address: email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
            total_amount: formattedTotalCost,
            delivery_address: "",
            order: [],
          },
          validationSchema: Yup.object({
            first_name: Yup.string().required("Please select a rating"),
            last_name: Yup.string().required("Please write a review"),
            phone_number: Yup.string().required("Please write a review"),
            delivery_address: Yup.string().required("Please write a review"),
          }),
          onSubmit: async (values) => {
            const { vendor_id, rating, review, customer_name } = values;
            let createOrderData = { vendor_id, rating, review, customer_name };
            const { payload } = await dispatch(placeOrder(createOrderData));
            if (payload.statusCode === 200) {
              console.log(payload);
            }
          },
        });

  console.log(cart);
    const serviceType = [
        { value: "express", label: "Express service" },
        { value: "standard", label: "Standard service" },
      ];
    return ( 
        <div  className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 bg-white border rounded-md overflow-hidden p-4">
                <div className="font-bold secondary-font flex items-center gap-4">
                  <Back />
                  <div>Checkout</div>
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectInput label={"Service type"} options={serviceType} />
                    <Input label={"Shipping address:"} />
                    <Input label={"Full name:"} />
                    <Input label={"Phone number:"} />
                  </div>
                  <div>
                    <div>Would you like us to create an account for you? <span>Creating a tailorlynk account allows you to conviniently keep track of your orders</span></div>
                    <div className="text-xs border rounded w-fit mt-4 flex p-[2px]">
                      <div className="rounded py-2 px-4 bg-primary text-white">Yes</div>
                      <div className="rounded py-2 px-4 text-primary">No</div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="lg:col-span-4 bg-white border rounded-md overflow-hidden p-4">
             <div>
              Total:
             </div>
             {formattedTotalCost}
            </div>
        </div>
     );
}
 
export default Checkout;