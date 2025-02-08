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

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    } else {
      console.error("API key is missing.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
