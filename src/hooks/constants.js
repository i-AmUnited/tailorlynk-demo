import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const base_url = 'http://192.34.59.231/api/v1/customer';

export const api_header = {
  "Content-Type": "application/json",
  "x-api-key": "16112024",
};

export const showSuccessMessage = (message) => {
  toast.success(message);
  return null;
};

export const showErrorMessage = (message) => {
  toast.error(message);
  return null;
};

export const retrieveFromLocalStorage = (keys) => {
  const data = {};
  keys.forEach((key) => {
    const persistedState = localStorage.getItem(key);
    try {
      data[key] = persistedState ? JSON.parse(persistedState) : null;
    } catch (error) {
      console.error(`Error parsing JSON for key "${key}":`, error);
      data[key] = null;
    }
  });
  return data;
};
