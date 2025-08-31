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
import Spinner from "../../components/Spinners/pageLoadingSpinner";

const Overview = () => {
  const loading = useSelector((state) => state.user.loading);
  const profileInfo = useProfileDetails();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(profileInfo);

  const dispatch = useDispatch();

  // Update local profile data when profileInfo changes
  useEffect(() => {
    setProfileData(profileInfo);
  }, [profileInfo]);

  const updateProfileForm = useFormik({
    initialValues: {
      full_name: profileData?.fullName || "",
      gender: profileData?.gender || "",
      email_address: profileData?.emailAddress || "",
      country_code: profileData?.countryCode || "+234",
      phone_number: profileData?.phoneNumber || "",
    },
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
        .matches(
          /^[1-9]\d{8,9}$/,
          "Please enter a valid UK phone number (9-10 digits)"
        )
        .required("Please provide a phone number"),
      country_code: Yup.string().required("Please select a country code"),
      gender: Yup.string()
        .oneOf(["male", "female", "other"], "Please select a valid gender")
        .required("Please select your gender"),
    }),
    onSubmit: async (values) => {
      const { full_name, email_address, phone_number, country_code, gender } =
        values;
      const updateUserData = {
        full_name,
        email_address,
        phone_number,
        country_code,
        gender,
      };
      const { payload } = await dispatch(updateDetails(updateUserData));

      if (payload.statusCode === 200) {
        showSuccessMessage("Details updated");
        // Update local profile data
        setProfileData({
          fullName: full_name,
          emailAddress: email_address,
          phoneNumber: phone_number,
          countryCode: country_code,
          gender: gender,
        });
        // Close modal
        setIsModalOpen(false);
        // Reset form
        updateProfileForm.resetForm();
      }
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    updateProfileForm.resetForm();
  };

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="rounded-lg bg-white">
      
        <div className="px-4 py-6 border-b text-md font-bold">Overview</div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="grid col-span-2 md:col-span-1">
            <span className="text-xs opacity-50">Email address:</span>
            <span>{profileData?.emailAddress}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Phone number:</span>
            <span>
              {profileData?.countryCode}
              {profileData?.phoneNumber}
            </span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Full name:</span>
            <span>{profileData?.fullName}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Gender:</span>
            <span>{profileData?.gender}</span>
          </div>
        </div>
        {/* Update Profile Info Button */}
        <div className="px-6 pb-6">
          <Button
            buttonRole="custom"
            buttonText="Update profile info"
            otherStyles="bg-primary text-white w-fit"
            onClick={openModal}
          />
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="font-bold">Update Profile Information</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={updateProfileForm.handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Your full name"
                    type="text"
                    name="full_name"
                    value={updateProfileForm.values.full_name}
                    onChange={updateProfileForm.handleChange}
                    onBlur={updateProfileForm.handleBlur}
                    onError={
                      updateProfileForm.touched.full_name &&
                      updateProfileForm.errors.full_name
                        ? updateProfileForm.errors.full_name
                        : null
                    }
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email_address"
                    value={updateProfileForm.values.email_address}
                    onChange={updateProfileForm.handleChange}
                    onBlur={updateProfileForm.handleBlur}
                    onError={
                      updateProfileForm.touched.email_address &&
                      updateProfileForm.errors.email_address
                        ? updateProfileForm.errors.email_address
                        : null
                    }
                  />
                  <SelectInput
                    label="Country Code"
                    name="country_code"
                    value={updateProfileForm.values.country_code}
                    onChange={updateProfileForm.handleChange}
                    onBlur={updateProfileForm.handleBlur}
                    onError={
                      updateProfileForm.touched.country_code &&
                      updateProfileForm.errors.country_code
                        ? updateProfileForm.errors.country_code
                        : null
                    }
                    options={[
                      { value: "", label: "Select country code" },
                      { value: "+44", label: "+44 (United Kingdom)" },
                    ]}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone_number"
                    value={updateProfileForm.values.phone_number}
                    onChange={updateProfileForm.handleChange}
                    onBlur={updateProfileForm.handleBlur}
                    onError={
                      updateProfileForm.touched.phone_number &&
                      updateProfileForm.errors.phone_number
                        ? updateProfileForm.errors.phone_number
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
                      updateProfileForm.touched.gender &&
                      updateProfileForm.errors.gender
                        ? updateProfileForm.errors.gender
                        : null
                    }
                    options={[
                      { value: "", label: "Select gender" },
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    buttonRole="submit"
                    buttonText="Update details"
                    otherStyles="bg-primary text-white"
                    loading={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
