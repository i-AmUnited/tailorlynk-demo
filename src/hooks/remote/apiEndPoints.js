import { showErrorMessage } from "../constants";
import { apiClient, apiClientWithToken } from "./apiClient";

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
      return apiClient.post("/customer/login", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async accountRegistration(data) {
    try {
      return apiClient.post("/customer/account-registration", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async verifyEmail(data) {
    try {
      return apiClient.post("/customer/verify-email-address", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async completeRegistration(data) {
    try {
      return apiClient.post("/customer/complete-registration", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listVendors(data) {
    try {
      return apiClient.get("/customer/list-vendor", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async vendorDetail(vendorID) {
    try {
      return apiClient.get(`/customer/single-vendor?vendorId=${vendorID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async vendorReviews(vendorID) {
    try {
      return apiClient.get(`/customer/vendor-rating-list?vendorId=${vendorID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async rateVendor(data) {
    try {
      return apiClient.post("/customer/rate-vendor", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async reportVendor(data) {
    try {
      return apiClient.post("/customer/report-vendor", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async singleCatalogueMaterial(catalogueId) {
    try {
      return apiClient.get(
        `/customer/single-catalogue-material?id=${catalogueId}`
      );
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async passwordResetOtp(data) {
    try {
      return apiClient.post("/customer/reset-password-otp", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async changePassword(data) {
    try {
      return apiClient.post("/customer/change-password", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async createOrder(data) {
    try {
      return apiClient.post("/customer/create-order", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async customerOrder(data) {
    try {
      return apiClientWithToken.get("/customer/get-customer-order", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listmaterials(data) {
    try {
      return apiClient.get("/customer/all-materials", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async addToWishList(data) {
    try {
      return apiClientWithToken.post("/customer/add-to-wish-list", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async removeFromWishList(catalogueId) {
    try {
      return apiClientWithToken.get(`/customer/delete-wish-list/${catalogueId}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listSavedItems(data) {
    try {
      return apiClientWithToken.get("/customer/list-user-wish-list", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  //cart endpoints
  static async addToCart(data) {
    try {
      return apiClientWithToken.post("/customer/add-to-cart", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listCart() {
    try {
      return await apiClientWithToken.get("/customer/list-user-cart");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async deleteCartItem(cartId) {
    try {
      return apiClientWithToken.get(`/customer/delete-cart/${cartId}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async shippingPrice(data) {
    try {
      return apiClient.post("/customer/shipping-price", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  //user-account endpoints
  static async profileDetails() {
    try {
      return await apiClientWithToken.get("/customer/profile-details");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async updateProfileDetails(data) {
    try {
      return await apiClientWithToken.post("/customer/update-profile", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async measurements(data) {
    try {
      return await apiClientWithToken.get("/customer/fetch-measurement", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

   static async updateMeasurementDetails(data) {
    try {
      return await apiClientWithToken.post("/customer/update-measurement", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async shippingAddress(data) {
    try {
      return await apiClientWithToken.get("/customer/shipping-address", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

   static async updateShippingAddress(data) {
    try {
      return await apiClientWithToken.post("/customer/create-shipping-address", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

 static async updatePassword(data) {
    try {
      return await apiClientWithToken.post("/customer/update-password", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async feedback(data) {
    try {
      return await apiClientWithToken.post("/customer/submit-feedback", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  //chat endpoints
  static async chatlist(data) {
    try {
      return await apiClientWithToken.get("/list-vendors-chat", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async chatDetails(vendorID) {
    try {
      return apiClientWithToken.get(`/get-vendor-chat/${vendorID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async sendMessage(data) {
    try {
      return await apiClientWithToken.post("/send-message", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

}