// import React, { useState } from "react";

// function ShippingAddress() {
//   const [isInNigeria, setIsInNigeria] = useState(true);
//   const [formData, setFormData] = useState({
//     country: "",
//     city: "",
//     houseName: "",
//     locality: "",
//     county: "",
//     postCode: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="bg-white p-8 rounded shadow-md">
//       <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
//       {/* Radio Buttons */}
//       <div className="flex items-center mb-4">
//         <label className="mr-4">
//           <input
//             type="radio"
//             name="location"
//             checked={!isInNigeria}
//             onChange={() => setIsInNigeria(false)}
//             className="mr-2"
//           />
//           I'm outside Nigeria
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="location"
//             checked={isInNigeria}
//             onChange={() => setIsInNigeria(true)}
//             className="mr-2"
//           />
//           I'm in Nigeria
//         </label>
//       </div>

//       {/* Form */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-2">Select country:</label>
//           <select
//             name="country"
//             value={formData.country}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//           >
//             <option value="">Select a country</option>
//             <option value="Nigeria">Nigeria</option>
//             <option value="Ghana">Ghana</option>
//             <option value="Kenya">Kenya</option>
//             <option value="USA">USA</option>
//             <option value="United Kingdom"> United Kingdom</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2">City:</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-2">House number / name:</label>
//           <input
//             type="text"
//             name="houseName"
//             value={formData.houseName}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-2">Locality (optional):</label>
//           <input
//             type="text"
//             name="locality"
//             value={formData.locality}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-2">County (optional):</label>
//           <input
//             type="text"
//             name="county"
//             value={formData.county}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-2">Post code:</label>
//           <input
//             type="text"
//             name="postCode"
//             value={formData.postCode}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="mt-6">
//         <button className="bg-[#CB997E] text-white px-6 py-2 rounded hover:bg-[#b6846e]">
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ShippingAddress;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ShippingAddress = () => {
  const [location, setLocation] = useState("Not In Nigeria");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [locality, setLocality] = useState("");
  const [shippingData, setShippingData] = useState(null);

  const API_KEY = "16112024";
  const AUTH_TOKEN =
    "eyJpdiI6IkNqUlE4ZHlVNHUwR0F5NHhQSzVldVE9PSIsInZhbHVlIjoiclQxM3dXN1RwTzNSTWwwYXJqNUtIcHhneUFYd0IzZ0RRQVhSOGZuWXFUcFUxa0VXUmwxRVNlcVF2Z3cxMDd1M2k3b0k1My9EL2JFQ0ZVVG5PNndUYTNPMklPTlgrenJjclNneXhkTDk3aFQvMit3ZUkvOEJHNWdFZGNpdlFlZE4iLCJtYWMiOiI2NmE0MTNkNWI1M2UxZmUxMTA1ZmI4MjVkMGJkMzU5YzY2MTE3MTcyMTRlNTVmMTA1MDhmNzM1MGI5Yzc5Yzg4IiwidGFnIjoiIn0=";

  // Fetch existing shipping address
  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get(
          "https://api-tailorlynk.stayandflight.com/api/v1/customer/shipping-address",
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
              "x-api-key": API_KEY,
            },
          }
        );
        setShippingData(response.data.data);
      } catch (error) {
        console.error("Error fetching shipping address:", error);
      }
    };
    fetchShippingAddress();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      location,
      country,
      city,
      house_number: houseNumber,
      postal_code: postalCode,
      locality,
    };

    try {
      const response = await axios.post(
        "https://api-tailorlynk.stayandflight.com/api/v1/customer/create-shipping-address",
        payload,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            "x-api-key": API_KEY,
          },
        }
      );
      alert("Shipping address saved successfully!");
      setShippingData(response.data);
    } catch (error) {
      console.error("Error saving shipping address:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Not In Nigeria"
              checked={location === "Not In Nigeria"}
              onChange={() => setLocation("Not In Nigeria")}
            />
            <span>I’m outside Nigeria</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="In Nigeria"
              checked={location === "In Nigeria"}
              onChange={() => setLocation("In Nigeria")}
            />
            <span>I’m in Nigeria</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select country:
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              House number / name:
            </label>
            <input
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Post code:</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Locality (optional):
            </label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-brown-600"
        >
          Save
        </button>
      </form>

      {shippingData && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">
            Saved Shipping Address:
          </h3>
          <p>Location: {shippingData.location}</p>
          <p>Country: {shippingData.country}</p>
          <p>City: {shippingData.city}</p>
          <p>House Number: {shippingData.houseNumber}</p>
          <p>Postal Code: {shippingData.postalCode}</p>
          <p>Locality: {shippingData.locality}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
