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

// const saveToLocalStorage = (key,data)=>{
//     localStorage.setItem(key, data);
// }

// export const userSignIn = createAsyncThunk(
//   "user/signIn",
//   async(values) => {
//       const signInEndPoint = await apiEndPoints.signIn(values);
//       const response = await signInEndPoint.data;
//       saveToLocalStorage("userSession", JSON.stringify(response));
//       return response;
//   }
// )

// const signOutSession = () =>{
//   localStorage.removeItem("users");
//   localStorage.removeItem("userSession"); 
// }

// export const signOut = createAsyncThunk(
//   "user/signOut",
//   async()=>{
//       signOutSession();
//   }
// )

export const userAccountRegistration = createAsyncThunk(
  "user/accountRegistration",
  async(values) => {
      const accountRegistrationEndPoint = await apiEndPoints.accountRegistration(values);
      const response = await accountRegistrationEndPoint.data;
      return response;
  }
)

export const verifyUserEmail = createAsyncThunk(
  "user/verifyUserEmail",
  async(values) => {
      const verifyEmailEndPoint = await apiEndPoints.verifyEmail(values);
      const response = await verifyEmailEndPoint.data;
      return response;
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


const slice = createSlice ({
  name: "user",
  initialState : initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(userSignIn.fulfilled, (state, action) => {
      //   if (action.payload.status_code === "0") {
      //     state.users = action.payload;
      //     state.isAuthenticated = true;
      //     state.userSession = action.payload;
      //   } else {
      //     state.error = action.payload.message;
      //     showErrorMessage(action.payload.message);
      //   }
      //   state.loading = false;
      // })
      // .addCase(signOut.fulfilled , (state)=>{
      //   state.isAuthenticated = false;
      //   state.loading = false;
      //   state.users = null;
      // })
      // .addCase(userSignIn.rejected, (state) => {
      //   state.loading = false;
      //   state.users = null;
      //   state.isAuthenticated = false;
      // })
      // .addCase(userAccountRegistration.fulfilled, (state, action) => {
      //   if (action.payload.statusCode === 200) {
      //     state.users = action.payload;
      //     showSuccessMessage(action.payload.message);
      //   } else {
      //     state.error = action.payload.message;
      //     showErrorMessage(action.payload.message);
      //   }
      //   state.loading = false;
      // })
      // .addCase(userSignUp.rejected, (state) => {
      //   state.loading = false;
      //   state.users = null;
      //   state.isAuthenticated = false;
      // })

      .addMatcher(
        isAnyOf(
          listVendors.fulfilled,
          vendorDetail.fulfilled,
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
        ),
        (state, action) => {
          state.loading = false;
          state.error = showErrorMessage(action.error.message);
          state.users = null;
        }
      );
  }
})

export const userReducer = slice.reducer;