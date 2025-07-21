import Input from "../../components/input";
import SelectInput from "../../components/select";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserShippingAddress } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";
import { useShippingAddress } from "../reuseableEffects";
import { useEffect, useState } from "react";

const ShippingAddress = () => {
  const loading = useSelector((state) => state.user.loading);
  const shippingAddress = useShippingAddress()

  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    location: "",
    country: "",
    city: "",
    house_number: "",
    postal_code: "",
    locality: ""
  });

  useEffect(() => {
    if (shippingAddress) {
      setInitialValues({
        location: shippingAddress?.location || "",
        country: shippingAddress?.country || "",
        city: shippingAddress?.city || "",
        house_number: shippingAddress?.houseNumber || "",
        postal_code: shippingAddress?.postalCode || "",
        locality: shippingAddress?.locality || "",
      });
    }
  }, [shippingAddress]);

  const shippingAddressForm = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      location: Yup.string()
        .required("Please select your location"),
      country: Yup.string()
        .required("Please enter your country"),
      city: Yup.string()
        .required("Please enter your city"),
      house_number: Yup.string()
        .required("Please enter your house number/address"),
      postal_code: Yup.string()
        .required("Please enter your postal code"),
      locality: Yup.string()
        .required("Please enter your locality/area"),
    }),
    onSubmit: async (values) => {
      const { location, country, city, house_number, postal_code, locality } = values;
      const shippingAddressData = { 
        location, 
        country: values.location === "In Nigeria" ? "Nigeria" : country, 
        city, 
        house_number, 
        postal_code, 
        locality 
      };
      const { payload } = await dispatch(updateUserShippingAddress(shippingAddressData));
      if (payload.statusCode === 200) {
        showSuccessMessage("Address updated");
      }
    },
  });

  // Auto-set country to Nigeria when "In Nigeria" is selected
  useEffect(() => {
    if (shippingAddressForm.values.location === "In Nigeria") {
      shippingAddressForm.setFieldValue("country", "Nigeria");
    } else if (shippingAddressForm.values.location === "Outside Nigeria" && shippingAddressForm.values.country === "Nigeria") {
      shippingAddressForm.setFieldValue("country", "");
    }
  }, [shippingAddressForm.values.location]);

  const isInNigeria = shippingAddressForm.values.location === "In Nigeria";

  return (
    <div className="rounded-lg bg-white">
      <div className="px-4 py-6 border-b text-md font-bold">Shipping Address</div>
      <form onSubmit={shippingAddressForm.handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <SelectInput
            label="Location"
            name="location"
            value={shippingAddressForm.values.location}
            onChange={shippingAddressForm.handleChange}
            onBlur={shippingAddressForm.handleBlur}
            onError={
              shippingAddressForm.touched.location && shippingAddressForm.errors.location
                ? shippingAddressForm.errors.location
                : null
            }
            options={[
              { value: "", label: "Select location" },
              { value: "In Nigeria", label: "In Nigeria" },
              { value: "Outside Nigeria", label: "Outside Nigeria" },
            ]}
          />
          <Input
            label="Country"
            type="text"
            name="country"
            value={shippingAddressForm.values.country}
            onChange={shippingAddressForm.handleChange}
            onBlur={shippingAddressForm.handleBlur}
            onError={
              shippingAddressForm.touched.country && shippingAddressForm.errors.country
                ? shippingAddressForm.errors.country
                : null
            }
            disabled={isInNigeria}
            placeholder={isInNigeria ? "Nigeria" : "Enter your country"}
          />
          <Input
            label="City"
            type="text"
            name="city"
            value={shippingAddressForm.values.city}
            onChange={shippingAddressForm.handleChange}
            onBlur={shippingAddressForm.handleBlur}
            onError={
              shippingAddressForm.touched.city && shippingAddressForm.errors.city
                ? shippingAddressForm.errors.city
                : null
            }
            placeholder="Enter your city"
          />
          <Input
            label="Locality/Area"
            type="text"
            name="locality"
            value={shippingAddressForm.values.locality}
            onChange={shippingAddressForm.handleChange}
            onBlur={shippingAddressForm.handleBlur}
            onError={
              shippingAddressForm.touched.locality && shippingAddressForm.errors.locality
                ? shippingAddressForm.errors.locality
                : null
            }
            placeholder="Enter your locality or area"
          />
          <Input
            label="House Number/Address"
            type="text"
            name="house_number"
            value={shippingAddressForm.values.house_number}
            onChange={shippingAddressForm.handleChange}
            onBlur={shippingAddressForm.handleBlur}
            onError={
              shippingAddressForm.touched.house_number && shippingAddressForm.errors.house_number
                ? shippingAddressForm.errors.house_number
                : null
            }
            placeholder="Enter your house number or street address"
          />
          <Input
            label="Postal Code"
            type="text"
            name="postal_code"
            value={shippingAddressForm.values.postal_code}
            onChange={shippingAddressForm.handleChange}
            onBlur={shippingAddressForm.handleBlur}
            onError={
              shippingAddressForm.touched.postal_code && shippingAddressForm.errors.postal_code
                ? shippingAddressForm.errors.postal_code
                : null
            }
            placeholder="Enter postal code"
          />
        </div>
        <Button
          buttonRole="submit"
          buttonText="Update Address"
          otherStyles="mt-4 bg-primary text-white"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default ShippingAddress;