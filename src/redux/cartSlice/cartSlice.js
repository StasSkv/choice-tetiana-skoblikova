import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  deleteProductFromCart,
  fetchProductsInCart,
  clearCart,
} from './cartOperations';

const initialState = { products: [], isLoading: false, error: null };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductsInCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsInCart.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProductsInCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addProductToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteProductFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(deleteProductFromCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(clearCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clearCart.rejected, (state) => {
      state.products = [];
      state.isLoading = false;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.products = [];
      state.isLoading = false;
    });
  },
});

export const cartReducer = cartSlice.reducer;
