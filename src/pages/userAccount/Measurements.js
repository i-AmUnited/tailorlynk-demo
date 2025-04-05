import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";
import { retrieveFromLocalStorage } from "../../hooks/constants";

const Measurement = () => {
  const [measurements, setMeasurements] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const fetchMeasurements = async () => {
    const { userSession } = retrieveFromLocalStorage(["userSession"]);
    const token = userSession?.data?.accessToken;
    const apiKey = userSession?.data?.apiKey;

    try {
      const response = await axiosInstance.get("/customer/fetch-measurement", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
      });

      if (response.status === 200 && response.data?.data) {
        const apiData = response.data.data;

        setMeasurements({
          chest: apiData.chest || "",
          waist: apiData.waist || "",
          hip: apiData.hip || "",
          shoulder: apiData.shoulder || "",
          sleeveLength: apiData.shortSleeveLength || "",
          shirtLength: apiData.shirtLength || "",
          thigh: apiData.thigh || "",
          neck: apiData.neck || "",
          armHole: apiData.armHole || "",
          others: apiData.others || "",
        });
      }
    } catch (error) {
      console.error("Error fetching measurements:", error);
      toast.error("Failed to load measurements.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({ ...prev, [name]: value }));
  };

  const formatForPostRequest = (data) => {
    return {
      chest: data.chest,
      waist: data.waist,
      hip: data.hip,
      shoulder: data.shoulder,
      short_sleeve_length: data.sleeveLength,
      long_sleeve_length: data.longSleeveLength || "",
      thigh: data.thigh,
      neck: data.neck,
      arm_hole: data.armHole,
      shirt_length: data.shirtLength,
      others: data.others,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { userSession } = retrieveFromLocalStorage(["userSession"]);
    const token = userSession?.data?.accessToken;
    const apiKey = userSession?.data?.apiKey;

    try {
      const payload = formatForPostRequest(measurements);
      const response = await axiosInstance.post(
        "/customer/update-measurement",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": apiKey,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Measurements updated successfully!");
      }
    } catch (error) {
      console.error("Error updating measurements:", error);
      toast.error("Failed to update measurements.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <ToastContainer />
      <h2 className="text-lg font-bold mb-4">Your Measurements</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {Object.keys(measurements).map((key) => (
          <div key={key}>
            <label className="block font-medium mb-1">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </label>
            <input
              type="text"
              name={key}
              value={measurements[key]}
              onChange={handleChange}
              className="input-style"
            />
          </div>
        ))}
      </form>

      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-4 bg-primary text-white py-2 px-4 rounded-lg"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Measurements"}
      </button>
    </div>
  );
};

export default Measurement;
