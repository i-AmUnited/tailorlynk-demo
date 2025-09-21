import { useFormik } from "formik";
import Back from "../../components/goBack";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, shippingFee } from "../../hooks/local/reducer";
import Button from "../../components/button";
import { showErrorMessage, showSuccessMessage } from "../../hooks/constants";
import { useState, useEffect } from "react";
import { useCart } from "../../components/cartContext";
import Spinner from "../../components/Spinners/pageLoadingSpinner";

const Checkout = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const { cart } = useCart();
  console.log(cart)

  const transformedOrders = cart.map((item) => ({
    classification_id: item.materialId,
    classification_name: item.materialName,
    classification: "material",
    amount: item.price.toString(),
    quantity: item.quantity.toString(),
    vendor_id: item.vendorId,
    weight: item.weight || "0" ,
    cart_id: String(item.cartInstanceId)
  }));

  const extractShippingFeeDetails = cart.map((item) => ({
    type: "catalogue",
     id: item?.productData?.materialId,
    // id: "nESamyFwj8",
    quantity: "1",
  }));

// const [createAccountStatus, setCreateAccountStatus] = useState(false);
const [getShippingButton, setGetShippingButton] = useState(true);
const [checkoutButton, setCheckoutButton] = useState(false);

const [deliveryFee, setDeliveryFee] = useState(0.00);
const platformFee = 10;

const orderTotal = cart.reduce((total, item) => {
  const price = parseFloat(item.price) || 0;
  return total + price;
}, 0);

const totalAmount = orderTotal + deliveryFee + platformFee;

  const countries = [
    { value: "UK", label: "United Kingdom (UK) " },
  ];

  const createOrderForm = useFormik({
    initialValues: {
      is_signed_in: false,
      customer_id: "",
      create_account: false,
      email_address: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      total_amount: totalAmount.toString(),
      address: "",
      city: "",
      state: "",
      country: "UK",
      postal_code: "",
      orders: transformedOrders,
      currency: "gbp",
      logistics_price: deliveryFee.toString()
    },
    // enableReinitialize: true,
    validationSchema: Yup.object({
      first_name: Yup.string().required("Please input your first name"),
      last_name: Yup.string().required("Please input your last name"),
      phone_number: Yup.string().required("Please input your phone number"),
      email_address: Yup.string().required("Please input your email address"),
      address: Yup.string().required("Please provide your house address"),
      city: Yup.string().required("Please provide your city"),
      state: Yup.string().required("Please provide your state/province"),
      country: Yup.string().required("Please select your country"),
      postal_code: Yup.string().required("Please provide your postal code"),
    }),
    onSubmit: async (values) => {
      const {
        is_signed_in,
        customer_id,
        create_account,
        email_address,
        first_name,
        last_name,
        phone_number,
        total_amount,
        address,
        city,
        state,
        country,
        postal_code,
        orders,
        currency, 
        logistics_price
      } = values;

      // Format delivery_address as an object
      const delivery_address = {
        address,
        city,
        state,
        country,
        postal_code
      };

      let createOrderData = {
        is_signed_in,
        customer_id,
        create_account,
        email_address,
        first_name,
        last_name,
        phone_number,
        total_amount,
        delivery_address,
        orders,
        currency, 
        logistics_price
      };

      console.log("Submitting order data:", createOrderData); // Debug log to verify logistics_price

      const { payload } = await dispatch(placeOrder(createOrderData));
      if (payload.statusCode === 200) {
        console.log(payload);
        showSuccessMessage("Order placed successfully");
        // Redirect to the Stripe checkout URL
        if (payload.data && payload.data.url) {
          window.location.href = payload.data.url;
        }
      }
    },
  });

  // Update form values when deliveryFee or totalAmount changes
  useEffect(() => {
    createOrderForm.setFieldValue('logistics_price', deliveryFee.toString());
    createOrderForm.setFieldValue('total_amount', totalAmount.toString());
  }, [deliveryFee, totalAmount]);

 const getShippingfee = useFormik({
    initialValues: {
      customer_address: {
        address: createOrderForm.values.address,
        country: "GB",
        city: createOrderForm.values.city,
        postal_code: createOrderForm.values.postal_code,
        state: createOrderForm.values.state
      },
      classification: extractShippingFeeDetails
    },
    enableReinitialize: true,
    
    onSubmit: async (values) => {
     const { customer_address } = values;
      
      if (!customer_address.address?.trim() || 
          !customer_address.city?.trim() || 
          !customer_address.postal_code?.trim() || 
          !customer_address.state?.trim()) {
        showErrorMessage("Please fill in all address fields before calculating shipping fee");
        return;
      }
    try {
      const { payload } = await dispatch(shippingFee(values));
      console.log("extractShippingFeeDetails:", values, payload);
      if (payload.statusCode === 200) {
        setDeliveryFee(payload?.data?.price);
        showSuccessMessage(payload?.message);
        setGetShippingButton(false);
        setCheckoutButton(true);
      }
    } catch (error) {
      console.error("Error fetching shipping fee:", error);
    }
  }
});

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      
        <div className="lg:col-span-8 bg-white border rounded-md overflow-hidden p-4">
          <div className="font-bold secondary-font flex items-center gap-4">
            <Back />
            <div>Checkout</div>
          </div>
          <form
            onSubmit={createOrderForm.handleSubmit}
            className="mt-6 grid gap-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-bold md:col-span-2 text-primary">
                Customer info:
              </div>
              <Input
                label={"First name:"}
                name={"first_name"}
                value={createOrderForm.values.first_name}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                onError={
                  createOrderForm.touched.first_name &&
                  createOrderForm.errors.first_name
                    ? createOrderForm.errors.first_name
                    : null
                }
              />
              <Input
                label={"Last name:"}
                name={"last_name"}
                value={createOrderForm.values.last_name}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                onError={
                  createOrderForm.touched.last_name &&
                  createOrderForm.errors.last_name
                    ? createOrderForm.errors.last_name
                    : null
                }
              />
              <Input
                label={"Phone number:"}
                name={"phone_number"}
                value={createOrderForm.values.phone_number}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                onError={
                  createOrderForm.touched.phone_number &&
                  createOrderForm.errors.phone_number
                    ? createOrderForm.errors.phone_number
                    : null
                }
              />
              <Input
                label={"Email address:"}
                name={"email_address"}
                value={createOrderForm.values.email_address}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                onError={
                  createOrderForm.touched.email_address &&
                  createOrderForm.errors.email_address
                    ? createOrderForm.errors.email_address
                    : null
                }
              />
              <div className="font-bold md:col-span-2 mt-4 text-primary">
                Shipping address:
              </div>
              <Input
                label={"House address:"}
                name={"address"}
                value={createOrderForm.values.address}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                onError={
                  createOrderForm.touched.address &&
                  createOrderForm.errors.address
                    ? createOrderForm.errors.address
                    : null
                }
              />
              <Input
                label={"City:"}
                name={"city"}
                value={createOrderForm.values.city}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                onError={
                  createOrderForm.touched.city && createOrderForm.errors.city
                    ? createOrderForm.errors.city
                    : null
                }
              />
              <Input
                label={"State/Province/Town:"}
                name={"state"}
                value={createOrderForm.values.state}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                onError={
                  createOrderForm.touched.state && createOrderForm.errors.state
                    ? createOrderForm.errors.state
                    : null
                }
              />
              <SelectInput
                label={"Country"}
                name={"country"}
                value={createOrderForm.values.country}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                options={countries}
                onError={
                  createOrderForm.touched.country &&
                  createOrderForm.errors.country
                    ? createOrderForm.errors.country
                    : null
                }
              />
              <Input
                label={"Postal code:"}
                name={"postal_code"}
                value={createOrderForm.values.postal_code}
                onChange={createOrderForm.handleChange}
                onBlur={createOrderForm.handleBlur}
                onError={
                  createOrderForm.touched.postal_code &&
                  createOrderForm.errors.postal_code
                    ? createOrderForm.errors.postal_code
                    : null
                }
              />
            </div>
            <div>
              <div className="text-xs text-gray-400">
                Would you like us to create an account for you?{" "}
                <span>
                  Creating a tailorlynk account allows you to conveniently keep
                  track of your orders
                </span>
              </div>
              <div className="text-xs border rounded w-fit mt-2 flex p-[2px]">
                <div
                  className={`rounded py-2 px-4 cursor-pointer ${
                    createOrderForm.values.create_account === true
                      ? "bg-primary text-white"
                      : "bg-red-100"
                  }`}
                  onClick={() =>
                    createOrderForm.setFieldValue("create_account", true)
                  }
                >
                  Yes
                </div>
                <div
                  className={`rounded py-2 px-4 cursor-pointer ${
                    createOrderForm.values.create_account === false
                      ? "bg-primary text-white"
                      : "bg-red-100"
                  }`}
                  onClick={() =>
                    createOrderForm.setFieldValue("create_account", false)
                  }
                >
                  No
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-4 lg:relative">
          <div className="bg-white border rounded-md overflow-hidden lg:sticky lg:top-5">
            <div className="bg-primary text-white px-4 py-6 border-b">
              <div className="font-bold secondary-font">Summary</div>
            </div>
            <div className="p-4">
              <div className="grid gap-3">
                <div className="flex justify-between">
                  <div className="text-[#c4c4c4]">Order amount:</div>
                  <div className="text-xs font-bold">£{orderTotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#c4c4c4]">Platform fee:</div>
                  <div className="text-xs font-bold">£{platformFee}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#c4c4c4]">Delivery:</div>
                  <div className="text-xs font-bold">£{deliveryFee.toFixed(2)}</div>
                </div>
              </div>
              <div className="flex justify-between text-primary text-sm font-semibold border-t mt-5 pt-5">
                <div>Total:</div>
                <div className="font-bold">£{totalAmount.toFixed(2)}</div>
              </div>
              <div className="mt-8">
                {checkoutButton && (
                  <Button
                    buttonRole={"custom"}
                    onClick={createOrderForm.handleSubmit}
                    buttonText={"Checkout!"}
                    otherStyles={"bg-primary text-white w-full text-center"}
                  />
                )}
                {getShippingButton && (
                  <Button
                    buttonRole={"custom"}
                    onClick={getShippingfee.handleSubmit}
                    buttonText={"Get shipping fee"}
                    otherStyles={"bg-primary/30 text-primary w-full text-center"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;