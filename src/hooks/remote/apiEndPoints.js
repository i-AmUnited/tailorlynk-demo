import { showErrorMessage } from "../constants";
import { apiClient } from "./apiClient";

export class apiEndPoints {
  static extractError(error) {
    let extracted;
    if (error.isAxiosError) {
      if (error.request) {
        extracted = ["Network error"];
      } else if (error.response) {
        extracted = [error.response.message];
      } else {
        extracted = ["An unexpected error occured"];
      }
    } else {
      extracted = [error.response.message || "An unexpected error occurred"];
    }
    extracted.forEach((error) => showErrorMessage(error));
  }

  static async signIn(data) {
    try {
      return apiClient.post("/user_login", data);
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

}