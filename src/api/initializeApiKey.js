const API_KEY = "16112024";

export const initializeApiKey = () => {
  if (!localStorage.getItem("apiKey")) {
    localStorage.setItem("apiKey", JSON.stringify(API_KEY));
    console.log("API key initialized and stored in localStorage.");
  } else {
    console.log("API key already exists in localStorage.");
  }
};
