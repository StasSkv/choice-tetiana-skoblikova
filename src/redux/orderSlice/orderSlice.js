import { createSlice } from '@reduxjs/toolkit';
import { createOrder, createOrderNotAuthorized, getUserOrders } from './orderOperation.js';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: null,
    currentOrder: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
      state.isLoading = false;
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(createOrderNotAuthorized.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createOrderNotAuthorized.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
      state.isLoading = false;
    })
    .addCase(createOrderNotAuthorized.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    })
    .addCase(getUserOrders.rejected, (state, action) => {
      state.error = action.payload;
    }),
});

export const { setCurrentOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;