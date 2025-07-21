import Input from "../../components/input";
import SelectInput from "../../components/select";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateDetails } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";
import { useProfileDetails } from "../reuseableEffects";
import { useEffect, useState } from "react";

const Overview = () => {
  const loading = useSelector((state) => state.user.loading);
  const profileInfo = useProfileDetails()

  // console.log(username, countryCode);

  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    full_name: "",
    gender: "",
    email_address: "",
    country_code: "+234",
    phone_number: "",
  });

  useEffect(() => {
    if (profileInfo) {
      setInitialValues({
        full_name: profileInfo?.fullName || "",
        email_address: profileInfo?.emailAddress || "",
        phone_number: profileInfo?.phoneNumber || "",
        country_code: profileInfo?.countryCode || "",
        gender: profileInfo?.gender || "",
      });
    }
  }, [profileInfo]);

    const updateProfileForm = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Full name must be at least 2 characters")
        .max(50, "Full name must be less than 50 characters")
        .required("Please provide your full name"),
      email_address: Yup.string()
        .required("Please provide an email address")
        .email("Please enter a valid email address"),
      phone_number: Yup.string()
        .matches(/^[0-9]{11}$|^[0-9]{10}$/, "Please enter a valid Nigerian phone number (10-11 digits)")
        .required("Please provide a phone number"),
      country_code: Yup.string()
        .required("Please select a country code"),
      gender: Yup.string()
        .oneOf(["male", "female", "other"], "Please select a valid gender")
        .required("Please select your gender"),
    }),
    onSubmit: async (values) => {
      const { full_name, email_address, phone_number, country_code, gender } = values;
      const updateUserData = { full_name, email_address, phone_number, country_code, gender  };
      const { payload } = await dispatch(updateDetails(updateUserData));
      // console.log(updateUserData)
      if (payload.statusCode === 200) {
        showSuccessMessage("Details updated");
      }
    },
  });

  return (
    <div className="rounded-lg bg-white">
      <div className="px-4 py-6 border-b text-md font-bold">Overview</div>
      <form onSubmit={updateProfileForm.handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Your full name"
            type="text"
            name="full_name"
            value={updateProfileForm.values.username}
            onChange={updateProfileForm.handleChange}
            onBlur={updateProfileForm.handleBlur}
            onError={
              updateProfileForm.touched.username && updateProfileForm.errors.username
                ? updateProfileForm.errors.username
                : null
            }
          />
          <Input
            label="Email Address"
            type="email"
            name="email_address"
            value={updateProfileForm.values.emailAddress}
            onChange={updateProfileForm.handleChange}
            onBlur={updateProfileForm.handleBlur}
            onError={
              updateProfileForm.touched.emailAddress && updateProfileForm.errors.emailAddress
                ? updateProfileForm.errors.emailAddress
                : null
            }
          />
          <SelectInput
            label="Country Code"
            name="country_code"
            value={updateProfileForm.values.countryCode}
            onChange={updateProfileForm.handleChange}
            onBlur={updateProfileForm.handleBlur}
            onError={
              updateProfileForm.touched.countryCode && updateProfileForm.errors.countryCode
                ? updateProfileForm.errors.countryCode
                : null
            }
            options={[
              { value: "", label: "Select country code" },
              { value: "+234", label: "+234 (Nigeria)" },
            ]}
          />
          <Input 
            label="Phone Number" 
            type="tel" 
            name="phone_number"
            value={updateProfileForm.values.phoneNumber}
            onChange={updateProfileForm.handleChange}
            onBlur={updateProfileForm.handleBlur}
            onError={
              updateProfileForm.touched.phoneNumber && updateProfileForm.errors.phoneNumber
                ? updateProfileForm.errors.phoneNumber
                : null
            }
            placeholder="e.g., 07031065214"
          />
          <SelectInput
            label="Gender"
            name="gender"
            value={updateProfileForm.values.gender}
            onChange={updateProfileForm.handleChange}
            onBlur={updateProfileForm.handleBlur}
            onError={
              updateProfileForm.touched.gender && updateProfileForm.errors.gender
                ? updateProfileForm.errors.gender
                : null
            }
            options={[
              { value: "", label: "Select gender" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
        <Button
          buttonRole="submit"
          buttonText="Update details"
          otherStyles="mt-4 bg-primary text-white"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default Overview;