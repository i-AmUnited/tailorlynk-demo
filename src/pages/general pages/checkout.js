import { useFormik } from "formik";
import { useCart } from "../../components/cartContext";
import Back from "../../components/goBack";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../hooks/local/reducer";

const Checkout = () => {
  const { cart } = useCart();
  const dispatch = useDispatch();

  const userSessionData = useSelector((state) => state.user.userSession);
  console.log(userSessionData);

  const createOrder = useFormik({
          initialValues: {
            is_signed_in: "",
            customer_id: "",
            create_account: "",
            email_address: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            total_amount: "",
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

  
  const totalCost = cart.reduce((sum, item) => 
    sum + ((parseFloat(item.cost.toString().replace(/,/g, "")) || 0) * (Number(item.quantity) || 1)), 
    0
  );
  
  const formattedTotalCost = totalCost.toLocaleString("en-US", { minimumFractionDigits: 2 });
  

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