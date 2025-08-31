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
import Spinner from "../../components/Spinners/pageLoadingSpinner";

const ShippingAddress = () => {
  const loading = useSelector((state) => state.user.loading);
  const shippingAddress = useShippingAddress();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingData, setShippingData] = useState(null);

  console.log(shippingAddress);

  const dispatch = useDispatch();

  // Update local shipping data when shippingAddress changes
  useEffect(() => {
    if (shippingAddress) {
      setShippingData(shippingAddress);
    }
  }, [shippingAddress]);

  const [initialValues, setInitialValues] = useState({
    location: "",
    country: "",
    city: "",
    house_number: "",
    postal_code: "",
    locality: ""
  });

  useEffect(() => {
    if (shippingData) {
      setInitialValues({
        location: shippingData?.location || "",
        country: shippingData?.country || "",
        city: shippingData?.city || "",
        house_number: shippingData?.houseNumber || "",
        postal_code: shippingData?.postalCode || "",
        locality: shippingData?.locality || "",
      });
    }
  }, [shippingData]);

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
      // postal_code: Yup.string()
      //   .required("Please enter your postal code"),
      // locality: Yup.string()
      //   .required("Please enter your locality/area"),
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
        
        // Update local shipping data immediately
        setShippingData({
          location: location,
          country: values.location === "In Nigeria" ? "Nigeria" : country,
          city: city,
          houseNumber: house_number,
          postalCode: postal_code,
          locality: locality,
        });
        
        // Close modal
        setIsModalOpen(false);
        // Reset form
        shippingAddressForm.resetForm();
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    shippingAddressForm.resetForm();
  };

  const isInNigeria = shippingAddressForm.values.location === "In Nigeria";
  const isAddressEmpty = Object.values(shippingData || {}).every((value) => value === "");

  return (
    <div className="rounded-lg bg-white">
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="px-4 py-6 border-b text-md font-bold">
        Shipping Address
      </div>
      
      {/* check if all items inside shippingAddress is empty */}
      {isAddressEmpty ? (
        <div className="p-6">
          <p className="text-gray-500 mb-4">No shipping address found. Please add your shipping address.</p>
          <Button
            buttonRole="button"
            buttonText="Add shipping address"
            otherStyles="bg-primary text-white"
            onClick={openModal}
          />
        </div>
      ) : (
        <>
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="grid">
              <span className="text-xs text-gray-500">Location:</span>
              <span>{shippingData?.location}</span>
            </div>
            <div className="grid">
              <span className="text-xs text-gray-500">Country:</span>
              <span>{shippingData?.country}</span>
            </div>
            <div className="grid">
              <span className="text-xs text-gray-500">City:</span>
              <span>{shippingData?.city}</span>
            </div>
            <div className="grid">
              <span className="text-xs text-gray-500">Locality/Area:</span>
              <span>{shippingData?.locality}</span>
            </div>
            <div className="grid col-span-2">
              <span className="text-xs text-gray-500">House Address:</span>
              <span>{shippingData?.houseNumber}</span>
            </div>
            <div className="grid">
              <span className="text-xs text-gray-500">Postal Code:</span>
              <span>{shippingData?.postalCode}</span>
            </div>
          </div>
          
          {/* Update Shipping Address Button */}
          <div className="px-6 pb-6">
            <Button
              buttonRole="custom"
              buttonText="Update shipping address"
              otherStyles="bg-primary text-white w-fit"
              onClick={openModal}
            />
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="font-bold">
                {isAddressEmpty ? "Add Shipping Address" : "Update Shipping Address"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={shippingAddressForm.handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <SelectInput
                  label="Location"
                  name="location"
                  value={shippingAddressForm.values.location}
                  onChange={shippingAddressForm.handleChange}
                  onBlur={shippingAddressForm.handleBlur}
                  onError={
                    shippingAddressForm.touched.location &&
                    shippingAddressForm.errors.location
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
                    shippingAddressForm.touched.country &&
                    shippingAddressForm.errors.country
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
                    shippingAddressForm.touched.city &&
                    shippingAddressForm.errors.city
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
                    shippingAddressForm.touched.locality &&
                    shippingAddressForm.errors.locality
                      ? shippingAddressForm.errors.locality
                      : null
                  }
                  placeholder="Enter your locality or area"
                />
                <Input
                  label="House Address"
                  type="text"
                  name="house_number"
                  value={shippingAddressForm.values.house_number}
                  onChange={shippingAddressForm.handleChange}
                  onBlur={shippingAddressForm.handleBlur}
                  onError={
                    shippingAddressForm.touched.house_number &&
                    shippingAddressForm.errors.house_number
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
                    shippingAddressForm.touched.postal_code &&
                    shippingAddressForm.errors.postal_code
                      ? shippingAddressForm.errors.postal_code
                      : null
                  }
                  placeholder="Enter postal code"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  buttonRole="custom"
                  buttonText="Cancel"
                  otherStyles="bg-gray-300 text-gray-700"
                  onClick={closeModal}
                />
                <Button
                  buttonRole="submit"
                  buttonText={isAddressEmpty ? "Add Address" : "Update Address"}
                  otherStyles="bg-primary text-white"
                  loading={loading}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;