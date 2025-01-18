import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { retrieveFromLocalStorage, showErrorMessage, showSuccessMessage } from "../constants";
import {apiEndPoints} from '../remote/apiEndPoints';

const initialState = {
    users: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    ...retrieveFromLocalStorage(["userSession"])
}

const saveToLocalStorage = (key,data)=>{
    localStorage.setItem(key, data);
}

export const userSignIn = createAsyncThunk(
  "user/signIn",
  async(values) => {
      const signInEndPoint = await apiEndPoints.signIn(values);
      const response = await signInEndPoint.data;
      saveToLocalStorage("userSession", JSON.stringify(response));
      return response;
  }
)

const signOutSession = () =>{
  localStorage.removeItem("users");
  localStorage.removeItem("userSession"); 
}

export const signOut = createAsyncThunk(
  "user/signOut",
  async()=>{
      signOutSession();
  }
)

export const userAccountRegistration = createAsyncThunk(
  "user/accountRegistration",
  async(values) => {
      try{
        const accountRegistrationEndPoint = await apiEndPoints.accountRegistration(values);
        const response = await accountRegistrationEndPoint.data;
        return response;
      }
      catch(error){
       return error.response.data;
      }
  }
)

export const verifyUserEmail = createAsyncThunk(
  "user/verifyUserEmail",
  async(values) => {
    try{
      const verifyEmailEndPoint = await apiEndPoints.verifyEmail(values);
      const response = await verifyEmailEndPoint.data;
      return response;
    }
    catch(error){
      return error.response.data;
    }
  }
)

export const completeUserRegistration = createAsyncThunk(
  "user/completeUserRegistration",
  async(values) => {
    try{
      const completeRegistrationEndPoint = await apiEndPoints.completeRegistration(values);
      const response = await completeRegistrationEndPoint.data;
      return response;
    }
    catch(error){
      return error.response.data;
     }
  }
)

export const listVendors = createAsyncThunk(
  "user/listVendors",
  async(values) => {
      const listVendorEndPoint = await apiEndPoints.listVendors(values);
      const response = await listVendorEndPoint.data;
      return response;
  }
)

export const vendorDetail = createAsyncThunk(
  "user/vendorDetail",
  async(vendorID) => {
      const vendorDetailEndPoint = await apiEndPoints.vendorDetail(vendorID);
      const response = await vendorDetailEndPoint.data;
      return response;
  }
)

export const vendorReviewList = createAsyncThunk(
  "user/vendorReviews",
  async(vendorID) => {
      const vendorReviewsEndPoint = await apiEndPoints.vendorReviews(vendorID);
      const response = await vendorReviewsEndPoint.data;
      return response;
  }
)

export const writeReview = createAsyncThunk(
  "user/writeReview",
  async(values) => {
      const writeReviewEndPoint = await apiEndPoints.rateVendor(values);
      const response = await writeReviewEndPoint.data;
      return response
  }
)

const slice = createSlice ({
  name: "user",
  initialState : initialState,
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

      .addCase(userSignIn.rejected, (state) => {
        state.loading = false;
        state.users = null;
        state.isAuthenticated = false;
      })

      .addCase(signOut.fulfilled , (state)=>{
        state.isAuthenticated = false;
        state.loading = false;
        state.users = null;
      })

      .addMatcher(
        isAnyOf(
          listVendors.fulfilled,
          vendorDetail.fulfilled,
          vendorReviewList.fulfilled,
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
        ),
        (state, action) => {
          state.loading = false;
          if (action.payload.statusCode === 200) {
            state.users = action.payload;
            showSuccessMessage(action.payload.message)
          } else {
            state.error = action.payload.message;
            showErrorMessage(action.payload.message);
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
        ),
        (state, action) => {
          state.loading = false;
          state.users = null;
          const { data } = action.payload || {};
          let errorMessage = data?.message || "Failed, Try again later";
          state.error = showErrorMessage(errorMessage);
        }
      );
  }
})

export const userReducer = slice.reducer;