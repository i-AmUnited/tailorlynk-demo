import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer";


const store = configureStore({
    reducer: {
      user: userReducer
    },
    devTools: true,
})

export default store;