import React, { useState } from "react";

function ShippingAddress() {
  const [isInNigeria, setIsInNigeria] = useState(true);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    houseName: "",
    locality: "",
    county: "",
    postCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
      {/* Radio Buttons */}
      <div className="flex items-center mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="location"
            checked={!isInNigeria}
            onChange={() => setIsInNigeria(false)}
            className="mr-2"
          />
          I'm outside Nigeria
        </label>
        <label>
          <input
            type="radio"
            name="location"
            checked={isInNigeria}
            onChange={() => setIsInNigeria(true)}
            className="mr-2"
          />
          I'm in Nigeria
        </label>
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
            <option value="United Kingdom"> United Kingdom</option>
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
            name="houseName"
            value={formData.houseName}
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
            name="postCode"
            value={formData.postCode}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button className="bg-[#CB997E] text-white px-6 py-2 rounded hover:bg-[#b6846e]">
          Save
        </button>
      </div>
    </div>
  );
}

export default ShippingAddress;
