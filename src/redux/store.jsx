import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import adminSlice from "./adminSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    admin: adminSlice,
  },
});
