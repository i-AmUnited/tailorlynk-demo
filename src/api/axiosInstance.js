import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-tailorlynk.stayandflight.com/api/v1/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = JSON.parse(localStorage.getItem("apiKey"));
    const { userSession } =
      JSON.parse(localStorage.getItem("userSession")) || {};

    const token = userSession?.data?.accessToken;

    // Get the customerId from the userSession (assuming it's stored there)
    const customerId = userSession?.data?.customerData?.customerId;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    } else {
      console.error("API key is missing.");
    }

    // If the customerId is present, add it to the headers
    if (customerId) {
      config.headers["x-customer-id"] = customerId;
    } else {
      console.error("Customer ID is missing.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
