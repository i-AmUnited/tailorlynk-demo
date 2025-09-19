import { useFormik } from "formik";
import Back from "../../components/goBack";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { placeOrder, shippingFee } from "../../hooks/local/reducer";
import Button from "../../components/button";
import { showSuccessMessage } from "../../hooks/constants";
import { useCustomerCartList, useProfile, useShippingAddress } from "../reuseableEffects";
import { useState } from "react";

const SessionCheckout = () => {
  const dispatch = useDispatch();

  const customerCartList = useCustomerCartList()
  console.log(customerCartList);

  const transformedOrders = customerCartList.map((item) => ({
    classification_id: item.productData.materialId,
    classification_name: item.productData.materialName,
    classification: "catalogue",
    amount: parseFloat(item.productData.price),
    quantity: "1",
    vendor_id: item.productData.vendorId,
    weight: item.weight,
    cart_id: String(item.id)
  }));

  const extractShippingFeeDetails = customerCartList.map((item) => ({
    type: "catalogue",
    // id: item?.productData?.materialId,
    id: "nESamyFwj8",
    quantity: "1",
  }));


  const orderTotalSignedIn = customerCartList.reduce((total, item) => {
  const price = parseFloat(item.productData.price) || 0;
  return total + price;
}, 0);

const [getShippingButton, setGetShippingButton] = useState(true);
const [checkoutButton, setCheckoutButton] = useState(false);

const [deliveryFee, setDeliveryFee] = useState(0.00);
const platformFee = 10;


const totalPriceSignedIn = orderTotalSignedIn + platformFee + deliveryFee;

  const profileInfo = useProfile();
  const shippingData = useShippingAddress();


  const customerID = profileInfo?.customerId || "";
  const phone = profileInfo?.phoneNumber || "";
  const email = profileInfo?.emailAddress || "";
  const fullName = profileInfo?.fullName || "";
  const [firstName, ...lastNameParts] = fullName.split(" ");
  const lastName = lastNameParts.join(" ");

  const locality = shippingData?.locality || "";
  const city = shippingData?.city || "";
  const house_number = shippingData?.houseNumber || "";
  const postal_code = shippingData?.postalCode || "";

  const countries = [
    { value: "UK", label: "United Kingdom (UK) " },
  ];

  const createOrderForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      is_signed_in: true,
      customer_id: customerID,
      create_account: false,
      email_address: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      total_amount: totalPriceSignedIn,
      address: house_number,
      city: city,
      state: locality,
      country: "UK",
      postal_code: postal_code,
      orders: transformedOrders,
      currency: "gbp",
      logistics_price: deliveryFee.toLocaleString()
    },
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
      
      const { payload } = await dispatch(placeOrder(createOrderData));
      console.log(payload, createOrderData);
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

  const getShippingfee = useFormik({
    enableReinitialize: true,
    initialValues: {
      customer_address: {
        address: house_number,
        country: "GB",
        city: city,
        postal_code: postal_code,
        state: locality
      },
      classification: extractShippingFeeDetails
    },
    
    onSubmit: async (values) => {
    try {
      const { payload } = await dispatch(shippingFee(values));
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 bg-white border rounded-md overflow-hidden p-4">
        <div className="font-bold secondary-font flex items-center gap-4">
          <Back />
          <div>Checkout</div>
        </div>
        <form onSubmit={createOrderForm.handleSubmit} className="mt-6 grid gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-bold md:col-span-2 text-primary">
              Customer info:
            </div>
            <Input
              label={"First name:"}
              name={"first_name"}
              readOnly={"readOnly"}
              disabled={"disabled"}
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
              readOnly={"readOnly"}
              disabled={"disabled"}
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
                createOrderForm.touched.city &&
                createOrderForm.errors.city
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
                createOrderForm.touched.state &&
                createOrderForm.errors.state
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
                <div className="text-xs font-bold">£{orderTotalSignedIn}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#c4c4c4]">Platform fee:</div>
                <div className="text-xs font-bold">£{platformFee} </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#c4c4c4]">Delivery:</div>
                <div className="text-xs font-bold">£{deliveryFee} </div>
              </div>
            </div>
            <div className="flex justify-between text-primary text-sm font-semibold border-t mt-5 pt-5">
              <div>Total:</div>
              <div className="font-bold">£{totalPriceSignedIn} </div>
            </div>
            <div className="mt-8">
              {
                checkoutButton && (
                  <Button
                buttonRole={"custom"}
                onClick={createOrderForm.handleSubmit}
                buttonText={"Checkout!"}
                otherStyles={"bg-primary text-white w-full text-center"}
              />
                )
              }
              {
                getShippingButton && (<Button 
                buttonRole={"custom"}
                onClick={getShippingfee.handleSubmit}
                buttonText={"Get shipping fee"}
                otherStyles={"bg-primary/30 text-primary w-full text-center"}
              />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCheckout;