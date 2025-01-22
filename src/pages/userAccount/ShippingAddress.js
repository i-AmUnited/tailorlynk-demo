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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "16112024";
  const AUTH_TOKEN =
    "eyJpdiI6IkNqUlE4ZHlVNHUwR0F5NHhQSzVldVE9PSIsInZhbHVlIjoiclQxM3dXN1RwTzNSTWwwYXJqNUtIcHhneUFYd0IzZ0RRQVhSOGZuWXFUcFUxa0VXUmwxRVNlcVF2Z3cxMDd1M2k3b0k1My9EL2JFQ0ZVVG5PNndUYTNPMklPTlgrenJjclNneXhkTDk3aFQvMit3ZUkvOEJHNWdFZGNpdlFlZE4iLCJtYWMiOiI2NmE0MTNkNWI1M2UxZmUxMTA1ZmI4MjVkMGJkMzU5YzY2MTE3MTcyMTRlNTVmMTA1MDhmNzM1MGI5Yzc5Yzg4IiwidGFnIjoiIn0=";

  // Fetch existing shipping address
  // useEffect(() => {
  //   const fetchShippingAddress = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         "https://api-tailorlynk.stayandflight.com/api/v1/customer/shipping-address",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${AUTH_TOKEN}`,
  //             "x-api-key": API_KEY,
  //           },
  //         }
  //       );
  //       setShippingData(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching shipping address:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchShippingAddress();
  // }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
      setError("Failed to save shipping address. Please try again.");
    } finally {
      setLoading(false);
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
              aria-label="Not In Nigeria"
            />
            <span>I’m outside Nigeria</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="In Nigeria"
              checked={location === "In Nigeria"}
              onChange={() => setLocation("In Nigeria")}
              aria-label="In Nigeria"
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
              aria-label="Country"
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
              aria-label="City"
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
              aria-label="House Number"
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
              aria-label="Postal Code"
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
              aria-label="Locality"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-brown-600"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

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
