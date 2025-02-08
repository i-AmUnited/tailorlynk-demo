import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";
import { retrieveFromLocalStorage } from "../../hooks/constants";

function ShippingAddress() {
  const [isInNigeria, setIsInNigeria] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    house_number: "",
    locality: "",
    county: "",
    postal_code: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Retrieve session data
    const { userSession } = retrieveFromLocalStorage(["userSession"]);
    const token = userSession?.data?.accessToken;
    const apiKey = userSession?.data?.apiKey;

    const payload = {
      location: isInNigeria ? "Nigeria" : "Not In Nigeria",
      ...formData,
    };

    try {
      const response = await axiosInstance.post(
        "/customer/create-shipping-address",
        payload,
        {
          headers: {
            "x-api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Shipping address saved successfully!");
      } else {
        toast.error(
          response.data.message || "Failed to save shipping address."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      {/* ✅ Toast Container */}
      <div className="px-4 py-6 border-b font-bold secondary-font">
        Shipping Address
      </div>
      <div className="px-4 py-6">
        {/* Radio Buttons */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="location"
              checked={!isInNigeria}
              onChange={() => setIsInNigeria(false)}
            />
            <label>I'm outside Nigeria</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="location"
              checked={isInNigeria}
              onChange={() => setIsInNigeria(true)}
            />
            <label>I'm in Nigeria</label>
          </div>
        </div>
        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Select country:</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select a country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="USA">USA</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">House number / name:</label>
            <input
              type="text"
              name="house_number"
              value={formData.house_number}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Locality (optional):</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">County (optional):</label>
            <input
              type="text"
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2">Post code:</label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#CB997E] hover:bg-[#b6846e]"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
