// import React, { useState } from "react";
// import Input from "../../components/input";
// import SelectInput from "../../components/select";
// import Button from "../../components/button";

// function Overview() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     gender: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <div className="">
//       <div className="px-4 py-6 border-b font-bold secondary-font">Overview</div>
//       <form onSubmit={handleSubmit} className="px-4 py-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Input
//             label={"Your full name"}
//             type="text"
//             id="fullName"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//           />
//           <div>
//             <label htmlFor="email" className="block font-medium mb-1">
//               Email address:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
//             />
//           </div>
//           <div>
//             <label htmlFor="phone" className="block font-medium mb-1">
//               Phone number:
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
//             />
//           </div>
//           <div>
//             <label htmlFor="gender" className="block font-medium mb-1">
//               Gender:
//             </label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
//             >
//               <option value="">Select gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-6">
//           <Button buttonRole={"submit"} buttonText={"Save details"} otherStyles={"bg-primary text-white"}/>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Overview;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";
import { retrieveFromLocalStorage } from "../../hooks/constants";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import Button from "../../components/button";

const Overview = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch user profile
  const fetchProfile = async () => {
    const { userSession } = retrieveFromLocalStorage(["userSession"]);
    const token = userSession?.data?.accessToken;
    const apiKey = userSession?.data?.apiKey;

    try {
      const response = await axiosInstance.get("/customer/profile-details", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
      });

      if (response.status === 200 && response.data?.data) {
        const apiData = response.data.data;
        setFormData({
          fullName: apiData.full_name || "",
          email: apiData.email_address || "",
          phone: apiData.phone_number || "",
          gender: apiData.gender || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format data for the update request
  const formatForPostRequest = (data) => ({
    full_name: data.fullName,
    email_address: data.email,
    phone_number: data.phone,
    gender: data.gender,
  });

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { userSession } = retrieveFromLocalStorage(["userSession"]);
    const token = userSession?.data?.accessToken;
    const apiKey = userSession?.data?.apiKey;

    try {
      const payload = formatForPostRequest(formData);
      const response = await axiosInstance.post(
        "/customer/update-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": apiKey,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <ToastContainer />
      <h2 className="text-lg font-bold mb-4">Overview</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Input
          label="Your full name"
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <Input
          label="Email Address"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled
        />
        <Input
          label="Phone Number"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <SelectInput
          label="Gender"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={[
            { value: "", label: "Select gender" },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />
      </form>

      <Button
        buttonRole="submit"
        buttonText={loading ? "Saving..." : "Save details"}
        otherStyles="mt-4 bg-primary text-white"
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
};

export default Overview;
