import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  retrieveFromLocalStorage,
  showErrorMessage,
  showSuccessMessage,APP_SECRET_KEY
} from "../constants";
import { apiEndPoints } from "../remote/apiEndPoints";
import CryptoJS from "crypto-js";

const initialState = {
  users: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  ...retrieveFromLocalStorage(["userSession"]),
};


const saveToLocalStorage = (key, data) => {
  const encryptedData = CryptoJS.AES.encrypt(data, APP_SECRET_KEY).toString();
  localStorage.setItem(key, encryptedData);
};

export const userSignIn = createAsyncThunk("user/signIn",
   async (values) => {
    try{
      const signInEndPoint = await apiEndPoints.signIn(values);
      const response = await signInEndPoint.data;
      saveToLocalStorage("userSession", JSON.stringify(response.data.customerData));
      saveToLocalStorage("token", JSON.stringify(response.data.accessToken));
      return response;
    }
    catch(error){
      return error.response.data;
    }
});

const signOutSession = () => {
  localStorage.removeItem("users");
  localStorage.removeItem("userSession");
  localStorage.removeItem("token");
};

export const signOut = createAsyncThunk("user/signOut", async () => {
  signOutSession();
});

export const userAccountRegistration = createAsyncThunk(
  "user/accountRegistration",
  async (values) => {
    try {
      const accountRegistrationEndPoint =
        await apiEndPoints.accountRegistration(values);
      const response = await accountRegistrationEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const verifyUserEmail = createAsyncThunk(
  "user/verifyUserEmail",
  async (values) => {
    try {
      const verifyEmailEndPoint = await apiEndPoints.verifyEmail(values);
      const response = await verifyEmailEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const completeUserRegistration = createAsyncThunk(
  "user/completeUserRegistration",
  async (values) => {
    try {
      const completeRegistrationEndPoint =
        await apiEndPoints.completeRegistration(values);
      const response = await completeRegistrationEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const listVendors = createAsyncThunk(
  "user/listVendors",
  async (values) => {
    const listVendorEndPoint = await apiEndPoints.listVendors(values);
    const response = await listVendorEndPoint.data;
    return response;
  }
);

export const vendorDetail = createAsyncThunk(
  "user/vendorDetail",
  async (vendorID) => {
    const vendorDetailEndPoint = await apiEndPoints.vendorDetail(vendorID);
    const response = await vendorDetailEndPoint.data;
    return response;
  }
);

export const vendorReviewList = createAsyncThunk(
  "user/vendorReviews",
  async (vendorID) => {
    const vendorReviewsEndPoint = await apiEndPoints.vendorReviews(vendorID);
    const response = await vendorReviewsEndPoint.data;
    return response;
  }
);

export const writeReview = createAsyncThunk(
  "user/writeReview",
  async (values) => {

try {
      const writeReviewEndPoint = await apiEndPoints.rateVendor(values);
    const response = await writeReviewEndPoint.data;
    return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const vendorReport = createAsyncThunk(
  "user/vendorReport",
  async (values) => {
    const vendorReportEndPoint = await apiEndPoints.reportVendor(values);
    const response = await vendorReportEndPoint.data;
    return response;
  }
);

export const singleCatalogueDetail = createAsyncThunk(
  "user/singleCatalogueDetail",
  async (catalogueId) => {
    const singleCatalogueDetailEndPoint =
      await apiEndPoints.singleCatalogueMaterial(catalogueId);
    const response = await singleCatalogueDetailEndPoint.data;
    // console.log(response);
    return response;
  }
);

export const resetPasswordOTP = createAsyncThunk(
  "user/resetPasswordOTP",
  async (values) => {
    try {
      const resetOTPEndPoint = await apiEndPoints.passwordResetOtp(values);
      const response = await resetOTPEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (values) => {
    try {
      const changePasswordEndPoint = await apiEndPoints.changePassword(values);
      const response = await changePasswordEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const placeOrder = createAsyncThunk(
  "user/placeOrder",
  async (values) => {
    try {
      const placeOrderEndPoint = await apiEndPoints.createOrder(values);
      console.log(placeOrderEndPoint);
      const response = await placeOrderEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getOrder = createAsyncThunk(
  "user/customerOrder",
  async (values) => {
    try {
      const getOrderEndPoint = await apiEndPoints.customerOrder(values);
      const response = await getOrderEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const materialList = createAsyncThunk(
  "user/listMaterials",
  async (values) => {
    const listMaterialEndPoint = await apiEndPoints.listmaterials(values);
    const response = await listMaterialEndPoint.data;
    return response;
  }
);

export const addItemToCart = createAsyncThunk(
  "user/addToCart",
  async (values) => {
    try{
  const addToCartEndPoint = await apiEndPoints.addToCart(values);
    const response = await addToCartEndPoint.data;
    return response;
    }
    catch(error){   
      return error.response.data;
  }
}
);

export const shippingFee = createAsyncThunk(
  "user/shippingFee",
  async (values) => {
    try{
    const shippingEndPoint = await apiEndPoints.shippingPrice(values);
    const response = await shippingEndPoint.data;
    return response;
     } catch (error) {
      return error.response.data;
    }
  }
);

export const customerCartList = createAsyncThunk(
  "user/customerCartList",
  async () => {
    try {
      const customerCartEndPoint = await apiEndPoints.listCart();
      const response = await customerCartEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "user/removeCartItem",
  async (values) => {
    try {
      const removeCartItemEndPoint = await apiEndPoints.deleteCartItem(values);
      const response = await removeCartItemEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateDetails = createAsyncThunk(
  "user/changeProfile",
  async (values) => {
    try {
      const updateDetailsEndPoint = await apiEndPoints.updateProfileDetails(values);
      const response = await updateDetailsEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const userProfileDetails = createAsyncThunk(
  "user/userProfileDetails",
  async () => {
    try {
      const userProfileDetailsEndPoint = await apiEndPoints.profileDetails();
      const response = await userProfileDetailsEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const userMeasurements = createAsyncThunk(
  "user/measurements",
  async (values) => {
    try {
      const userMeasurementsEndPoint = await apiEndPoints.measurements(values);
      const response = await userMeasurementsEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateMeasurements = createAsyncThunk(
  "user/updateMeasurements",
  async (values) => {
    try {
      const updateMeasurementsEndPoint = await apiEndPoints.updateMeasurementDetails(values);
      const response = await updateMeasurementsEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const userShippingAddress = createAsyncThunk(
  "user/shippingAddress",
  async (values) => {
    try {
      const userAddressEndPoint = await apiEndPoints.shippingAddress(values);
      const response = await userAddressEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateUserShippingAddress = createAsyncThunk(
  "user/updateshippingAddress",
  async (values) => {
    try {
      const updateAddressEndPoint = await apiEndPoints.updateShippingAddress(values);
      const response = await updateAddressEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async (values) => {
    try {
      const updatePasswordEndPoint = await apiEndPoints.updatePassword(values);
      const response = await updatePasswordEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const submitFeedback = createAsyncThunk(
  "user/submitFeedback",
  async (values) => {
    try {
      const feedbackEndPoint = await apiEndPoints.feedback(values);
      const response = await feedbackEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const saveItem = createAsyncThunk(
  "user/saveItem",
  async (values) => {
    try {
      const saveItemEndPoint = await apiEndPoints.addToWishList(values);
      const response = await saveItemEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const removeSavedItem = createAsyncThunk(
  "user/removeSavedItem",
  async (values) => {
    try {
      const removeItemEndPoint = await apiEndPoints.removeFromWishList(values);
      const response = await removeItemEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const savedItemsList = createAsyncThunk(
  "user/listItems",
  async (values) => {
    const listSavedItemsEndPoint = await apiEndPoints.listSavedItems(values);
    const response = await listSavedItemsEndPoint.data;
    return response;
  }
);

export const listChat = createAsyncThunk(
  "user/listChat",
  async (values) => {
    const listChatEndPoint = await apiEndPoints.chatlist(values);
    const response = await listChatEndPoint.data;
    return response;
  }
);

export const chatMessages = createAsyncThunk(
  "user/chatMessages",
  async (values) => {
    try {
      const chatMessagesEndPoint = await apiEndPoints.chatDetails(values);
      const response = await chatMessagesEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const sendChat = createAsyncThunk(
  "user/sendChat",
  async (values) => {
    try {
      const sendChatEndPoint = await apiEndPoints.sendMessage(values);
      const response = await sendChatEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState: initialState,
  
  reducers: {},
 
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.users = action.payload;
          state.isAuthenticated = true;
          state.userSession = action.payload; 
        } else {
          state.error = action.payload.message;
          showErrorMessage(action.payload.message);
        }
        state.loading = false;
      })

      .addCase(userSignIn.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.isAuthenticated = false;
      })

      .addCase(signOut.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.users = null;
      })

      .addMatcher(
        isAnyOf(
          listVendors.fulfilled,
          vendorDetail.fulfilled,
          vendorReviewList.fulfilled,
          singleCatalogueDetail.fulfilled,
          materialList.fulfilled,
          userProfileDetails.fulfilled,
          userMeasurements.fulfilled,
          userShippingAddress.fulfilled,
          savedItemsList.fulfilled,
          listChat.fulfilled,
          chatMessages.fulfilled,
          sendChat.fulfilled,
          getOrder.fulfilled,
          customerCartList.fulfilled
        ),
        (state, action) => {
          state.loading = false;
          if (action.payload.statusCode === 200) {
            state.users = action.payload.data;
          } else {
            state.error = action.payload.message;
            showErrorMessage(action.payload.message);
            
          }
        }
      )

      .addMatcher(
        isAnyOf(
          userAccountRegistration.fulfilled,
          verifyUserEmail.fulfilled,
          completeUserRegistration.fulfilled,
          writeReview.fulfilled,
          vendorReport.fulfilled,
          resetPasswordOTP.fulfilled,
          changePassword.fulfilled,
          addItemToCart.fulfilled,
          placeOrder.fulfilled,
          updateDetails.fulfilled,
          updateMeasurements.fulfilled,
          updateUserShippingAddress.fulfilled,
          updateUserPassword.fulfilled,
          submitFeedback.fulfilled,
          saveItem.fulfilled,
          removeSavedItem.fulfilled,
          removeCartItem.fulfilled,
          shippingFee.fulfilled
        ),
        (state, action) => {
          state.loading = false;
          if (action.payload.statusCode === 200) {
            state.users = action.payload;
            showSuccessMessage(action.payload.message);
            console.log(action.payload)
          } else {
            state.error = action.payload.message;
            showErrorMessage(action.payload.message);
            console.log(action.payload)
          }
        }
      )

      .addMatcher(
        isAnyOf(
          listVendors.pending,
          vendorDetail.pending,
          userAccountRegistration.pending,
          verifyUserEmail.pending,
          completeUserRegistration.pending,
          userSignIn.pending,
          vendorReviewList.pending,
          writeReview.pending,
          vendorReport.pending,
          singleCatalogueDetail.pending,
          resetPasswordOTP.pending,
          changePassword.pending,
          placeOrder.pending,
          materialList.pending,
          addItemToCart.pending,
          updateDetails.pending,
          userProfileDetails.pending,
          userMeasurements.pending,
          updateMeasurements.pending,
          userShippingAddress.pending,
          updateUserShippingAddress.pending,
          updateUserPassword.pending,
          submitFeedback.pending,
          saveItem.pending,
          removeSavedItem.pending,
          savedItemsList.pending,
          listChat.pending,
          chatMessages.pending,
          sendChat.pending,
          getOrder.pending,
          customerCartList.pending,
          removeCartItem.pending,
          shippingFee.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
          state.users = null;
        }
      )

      .addMatcher(
        isAnyOf(
          listVendors.rejected,
          vendorDetail.rejected,
          userAccountRegistration.rejected,
          verifyUserEmail.rejected,
          completeUserRegistration.rejected,
          vendorReviewList.rejected,
          writeReview.rejected,
          vendorReport.rejected,
          singleCatalogueDetail.rejected,
          resetPasswordOTP.rejected,
          userSignIn.rejected,
          changePassword.rejected,
          placeOrder.rejected,
          materialList.rejected,
          addItemToCart.rejected,
          updateDetails.rejected,
          userProfileDetails.rejected,
          userMeasurements.rejected,
          updateMeasurements.rejected,
          userShippingAddress.rejected,
          updateUserShippingAddress.rejected,
          updateUserPassword.rejected,
          submitFeedback.rejected,
          saveItem.rejected,
          removeSavedItem.rejected,
          savedItemsList.rejected,
          listChat.rejected,
          chatMessages.rejected,
          sendChat.rejected,
          getOrder.rejected,
          customerCartList.rejected,
          removeCartItem.rejected,
          shippingFee.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.users = null;
          state.error = showErrorMessage(action?.error?.message);
        }
      );
  },
});


export const userReducer = slice.reducer;
