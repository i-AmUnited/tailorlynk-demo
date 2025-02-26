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
      return apiClient.post("/login", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async accountRegistration(data) {
    try {
      return apiClient.post("/account-registration", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async verifyEmail(data) {
    try {
      return apiClient.post("/verify-email-address", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async completeRegistration(data) {
    try {
      return apiClient.post("/complete-registration", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listVendors(data) {
    try {
      return apiClient.get("/list-vendor", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async vendorDetail(vendorID) {
    try {
      return apiClient.get(`/single-vendor?vendorId=${vendorID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async vendorReviews(vendorID) {
    try {
      return apiClient.get(`/vendor-rating-list?vendorId=${vendorID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async rateVendor(data) {
    try {
      return apiClient.post("/rate-vendor", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async reportVendor(data) {
    try {
      return apiClient.post("/report-vendor", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async singleCatalogueMaterial(catalogueId) {
    try {
      return apiClient.get(
        `/single-catalogue-material?id=${catalogueId}`
      );
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async passwordResetOtp(data) {
    try {
      return apiClient.post("/reset-password-otp", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async changePassword(data) {
    try {
      return apiClient.post("/change-password", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async createOrder(data) {
    try {
      return apiClient.post("/create-order", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }
}