import { useFormik } from "formik";
import { useCart } from "../../components/cartContext";
import Back from "../../components/goBack";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../hooks/local/reducer";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import { showSuccessMessage } from "../../hooks/constants";

const Checkout = () => {
  const { cart } = useCart();
  const dispatch = useDispatch();

  const rawOrderTotal = cart.reduce((sum, item) => {
  const price = parseFloat(item.price.replace(/,/g, ''));
  return sum + (price * item.quantity);
}, 0);

const deliveryFee = 10;
const insuranceFee = 10;

// Keep as numbers for calculation
const totalPrice = rawOrderTotal + deliveryFee + insuranceFee;

// Format only when you need to display them
const formattedOrderTotal = rawOrderTotal.toLocaleString();
const formattedTotalPrice = totalPrice.toLocaleString();

  const loading = useSelector((state) => state.user.loading);

  const userSessionData = useSelector((state) => state.user.userSession);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!userSessionData);
  }, [userSessionData]);

  console.log(userSessionData);

  const customerID = userSessionData?.data?.customerData?.customerId || "";
  const phone = userSessionData?.data?.customerData?.phoneNumber || "";
  const email = userSessionData?.data?.customerData?.emailAddress || "";
  const fullName = userSessionData?.data?.customerData?.fullName || "";
  const [firstName, ...lastNameParts] = fullName.split(" ");
  const lastName = lastNameParts.join(" ");

  const [createAccount, setCreateAccount] = useState(userSessionData ? false : true);

  const transformedOrders = cart.map((item) => ({
    classification_id: item.materialId,
    classification_name: item.category,
    classification: "catalogue",
    amount: parseFloat(item.price),
    quantity: item.quantity.toString(),
    vendor_id: item.vendorData.vendorId,
    weight: "2"
  }));

  const createOrderForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      is_signed_in: isSignedIn,
      customer_id: customerID,
      create_account: createAccount,
      email_address: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      total_amount: formattedTotalPrice,
      delivery_address: "",
      orders: transformedOrders,
      currency: "gbp",
      logistics_price: "10"
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Please input your first name"),
      last_name: Yup.string().required("Please input your last name"),
      phone_number: Yup.string().required("Please input your phone number"),
      email_address: Yup.string().required("Please input your email address"),
      delivery_address: Yup.string().required(
        "Please provide a delivery address"
      ),
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
        delivery_address,
        orders,
        currency, logistics_price
      } = values;
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
        currency, logistics_price
      };
      const { payload } = await dispatch(placeOrder(createOrderData));
      console.log(payload, createOrderData);
      if (payload.statusCode === 200) {
        console.log(payload);
        showSuccessMessage("sign in succesfull");

        // Redirect to the Stripe checkout URL
        if (payload.data && payload.data.url) {
          window.location.href = payload.data.url;
        }
      }
    },
  });

  const countries = [
    { value: "UK", label: "United Kingdom (UK) " },
  ];


  return (
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
              label={"Phone nuber:"}
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
              name={"delivery_address"}
              value={createOrderForm.values.delivery_address}
              onChange={createOrderForm.handleChange}
              onBlur={createOrderForm.handleBlur}
              onError={
                createOrderForm.touched.delivery_address &&
                createOrderForm.errors.delivery_address
                  ? createOrderForm.errors.delivery_address
                  : null
              }
            />
            <Input
              label={"Region:"}
              // name={"delivery_address"}
            />
             <Input
              label={"State/Province/Town:"}
              // name={"delivery_address"}
            />
            <SelectInput
              label={"Service type"}
              options={countries}
            />
             <Input
              label={"Post code:"}
              // name={"delivery_address"}
            />
          </div>
          <div className={`${!userSessionData ? "" : "hidden"}`}>
            <div className="text-xs text-gray-400">
              Would you like us to create an account for you?{" "}
              <span>
                Creating a tailorlynk account allows you to conviniently keep
                track of your orders
              </span>
            </div>
            <div className="text-xs border rounded w-fit mt-2 flex p-[2px]">
              <div
                className={`rounded py-2 px-4 cursor-pointer ${
                  createAccount ? "bg-primary text-white" : "text-primary"
                }`}
                onClick={() => setCreateAccount(true)}
              >
                Yes
              </div>
              <div
                className={`rounded py-2 px-4 cursor-pointer ${
                  !createAccount ? "bg-primary text-white" : "text-primary"
                }`}
                onClick={() => setCreateAccount(false)}
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
                <div className="text-xs font-bold">£{formattedOrderTotal}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#c4c4c4]">Insurance fee:</div>
                <div className="text-xs font-bold">£{insuranceFee} </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#c4c4c4]">Delivery:</div>
                <div className="text-xs font-bold">£{deliveryFee} </div>
              </div>
            </div>
            <div className="flex justify-between text-primary text-sm font-semibold border-t mt-5 pt-5">
              <div>Total:</div>
              <div className="font-bold">£{formattedTotalPrice} </div>
            </div>
            <div className="mt-8">
              <Button
                buttonRole={"custom"}
                onClick={createOrderForm.handleSubmit}
                buttonText={"Pay!"}
                otherStyles={"bg-primary/30 text-primary w-full"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
