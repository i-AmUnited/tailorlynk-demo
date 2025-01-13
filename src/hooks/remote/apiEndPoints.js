import { showErrorMessage } from "../constants";
import { apiClient } from "./apiClient";

export class apiEndPoints {
  static extractError(error) {
    let extracted = [];
    if (error.isAxiosError) {
      if (error.response) {
        if (error.response.data && error.response.message) {
          extracted.push(error.response.message);
        } else {
          extracted.push("An unexpected Error occurred");
        }
      } else if (error.request) {
        extracted.push("Network Error Occurred");
      } else {
        extracted.push("An Unexpected Error Occurred");
      }
    } else {
      extracted.push(error.message || "An unexpected Error occurred");
    }
    extracted.forEach((errorMsg) => showErrorMessage(errorMsg));
  }

  static async signIn(data) {
    try {
      return apiClient.post("customer/login", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async accountRegistration(data) {
    try {
      return apiClient.post("customer/account-registration", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async verifyEmail(data) {
    try {
      return apiClient.post("customer/verify-email-address", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async completeRegistration(data) {
    try {
      return apiClient.post("customer/complete-registration", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listVendors(data) {
    try {
      return apiClient.get("customer/list-vendor", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async vendorDetail(vendorID) {
    try {
      return apiClient.get(`customer/single-vendor?vendorId=${vendorID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

}