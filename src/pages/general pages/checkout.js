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

  const loading = useSelector((state) => state.user.loading);

  const userSessionData = useSelector((state) => state.user.userSession);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!userSessionData);
  }, [userSessionData]);

  const totalCost = cart.reduce((sum, item) => 
    sum + ((parseFloat(item.cost.toString().replace(/,/g, "")) || 0) * (Number(item.quantity) || 1)), 
    0
  );
  const formattedTotalCost = parseFloat(totalCost.toFixed(2));
  
  
  
  // Payment
  const [txndatetime, setTxndatetime] = useState("");
  const [hashExtended, setHashExtended] = useState("");

  useEffect(() => {
    const getDateTime = () => {
      const now = new Date();
      return (
        now.getFullYear() +
        ":" +
        String(now.getMonth() + 1).padStart(2, "0") +
        ":" +
        String(now.getDate()).padStart(2, "0") +
        "-" +
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0") +
        ":" +
        String(now.getSeconds()).padStart(2, "0")
      );
    };

    const createExtendedHash = async (chargetotal, currency) => {
      const sharedSecret = "sharedsecret";
      const separator = "|";
      const storeId = "10123456789";
      const timezone = "Europe/London";
      const txntype = "sale";
      const checkoutoption = "combinedpage";
      const txndatetimeValue = getDateTime();

      setTxndatetime(txndatetimeValue);

      const stringToHash = [
        chargetotal,
        checkoutoption,
        currency,
        "HMACSHA256",
        storeId,
        timezone,
        txndatetimeValue,
        txntype,
      ].join(separator);

      const encoder = new TextEncoder();
      const key = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(sharedSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );

      const signature = await window.crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(stringToHash)
      );

      setHashExtended(btoa(String.fromCharCode(...new Uint8Array(signature))));
    };

    createExtendedHash("13.00", "978");
  }, []);
  // Payment




  const customerID = userSessionData?.data?.customerData?.customerId || "";
  const phone = userSessionData?.data?.customerData?.phoneNumber || "";
  const email = userSessionData?.data?.customerData?.emailAddress || "";
  const fullName = userSessionData?.data?.customerData?.fullName || "";
  const [firstName, ...lastNameParts] = fullName.split(" ");
  const lastName = lastNameParts.join(" "); 

  const[createAccount, setCreateAccount] = useState(true);

  const transformedOrders = cart.map(item => ({
        classification_id: item.catalogueId,
        classification: "catalogue",
        amount: parseFloat(item.cost),
        quantity: item.quantity.toString(),
        vendor_id: item.vendorData.vendorId
    }));

  const createOrderForm = useFormik({
          initialValues: {
            is_signed_in: isSignedIn,
            customer_id: customerID,
            create_account: createAccount,
            email_address: email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
            total_amount: formattedTotalCost,
            delivery_address: "",
            orders: transformedOrders,
          },
          validationSchema: Yup.object({
            first_name: Yup.string().required("Please input your first name"),
            last_name: Yup.string().required("Please input your last name"),
            phone_number: Yup.string().required("Please input your phone number"),
            email_address: Yup.string().required("Please input your email address"),
            delivery_address: Yup.string().required("Please provide a delivery address"),
          }),
          onSubmit: async (values) => {
            const { is_signed_in, customer_id, create_account, email_address, first_name, last_name, phone_number, total_amount, delivery_address, orders } = values;
            let createOrderData = { is_signed_in, customer_id, create_account, email_address, first_name, last_name, phone_number, total_amount, delivery_address, orders };
            const { payload } = await dispatch(placeOrder(createOrderData));
            console.log(payload, createOrderData);
            if (payload.statusCode === 200) {
              console.log(payload);
              showSuccessMessage("sign in succesfull");
            }
          },
        });

    const serviceType = [
        { value: "express", label: "Express service" },
        { value: "standard", label: "Standard service" },
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
            className="mt-6 grid gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput label={"Service type"} options={serviceType} />
              <Input
                label={"Shipping address:"}
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
            </div>
            <div>
              <div>
                Would you like us to create an account for you?{" "}
                <span>
                  Creating a tailorlynk account allows you to conviniently keep
                  track of your orders
                </span>
              </div>
              <div className="text-xs border rounded w-fit mt-4 flex p-[2px]">
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

            {/* <Button
              buttonText={"Send order"}
              otherStyles={"bg-primary text-white"}
              loading={loading}
            /> */}
          </form>

          <form
            method="post"
            action="https://test.ipg-online.com/connect/gateway/processing"
          >
            <input type="hidden" name="storename" value="10123456789" />
            <input type="hidden" name="timezone" value="Europe/London" />
            <input type="hidden" name="txntype" value="sale" /> 
            <input type="hidden" name="chargetotal" value="13.00" />
            <input type="hidden" name="currency" value="978" />
            <input type="hidden" name="txndatetime" value={txndatetime} />
            <input type="hidden" name="hashExtended" value={hashExtended} />
            <input type="hidden" name="hash_algorithm" value="HMACSHA256" />
            <input type="hidden" name="checkoutoption" value="combinedpage" />

            {/* <button type="submit">
              Pay Now
            </button> */}
            <Button
              buttonText={"Send order"}
              otherStyles={"bg-primary text-white"}
              loading={loading}
            />
          </form>
        </div>
        <div className="lg:col-span-4 bg-white border rounded-md overflow-hidden p-4">
          <div>Total:</div>
          {formattedTotalCost}
        </div>
      </div>
    );
}
 
export default Checkout;