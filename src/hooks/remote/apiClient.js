import Axios from "axios";
import { base_url, api_header, APP_SECRET_KEY } from "../constants";
import CryptoJS from "crypto-js";

export const apiClient = Axios.create(
    {
        baseURL: base_url,
        headers: api_header,
    }
)

export const apiClientWithToken = Axios.create(
    {
        baseURL: base_url,
        headers: api_header,
    }
)

apiClientWithToken.interceptors.request.use(
    (config) => {
        const decryptedData = CryptoJS.AES.decrypt(localStorage.getItem("token"), APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        // console.log(decryptedData)
        const parsedData = JSON.parse(decryptedData); 
        if (parsedData) {
          config.headers["Authorization"] = `Bearer ${parsedData}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
)

// apiClientWithToken.interceptors.request.use(
//     (config) => {
//         const encryptedToken = localStorage.getItem("token");
        
//         if (encryptedToken) {
//             try {
//                 const decryptedData = CryptoJS.AES.decrypt(encryptedToken, APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
//                 console.log(decryptedData);
                
//                 if (decryptedData) {
//                     const parsedData = JSON.parse(decryptedData); 
//                     if (parsedData) {
//                         config.headers["Authorization"] = `Bearer ${parsedData}`;
//                     }
//                 }
//             } catch (error) {
//                 console.error("Token decryption failed:", error);
//                 localStorage.removeItem("token");
//             }
//         }
        
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// )
