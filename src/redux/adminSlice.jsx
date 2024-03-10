import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    orders: [],
    inventory: [],
  },
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addOrders: (state, action) => {
      state.orders = action.payload;
    },
    addInventory: (state, action) => {
      state.inventory = action.payload;
    },
  },
});
export const { addUsers, addOrders, addInventory } = adminSlice.actions;
export default adminSlice.reducer;
