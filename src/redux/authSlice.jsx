import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    cartItemId: null,
  },
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCartItemId: (state, action) => {
      state.cartItemId = action.payload;
    },
  },
});
export const { login, logout, setUser, setCartItemId } = authSlice.actions;
export default authSlice.reducer;
