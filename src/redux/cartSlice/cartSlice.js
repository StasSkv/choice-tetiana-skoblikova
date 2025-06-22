import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCart(state, action) {
      const id = action.payload;
      const item = state.products.find((p) => p.id === id);
      if (item) {
        item.quantity += 1;
      } else {
        state.products.push({ id, quantity: 1 });
      }
    },
    addPlusQuantity(state, action) {
      const id = action.payload;
      const item = state.products.find((p) => p.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    addMinusQuantity(state, action) {
      const id = action.payload;
      const item = state.products.find((p) => p.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.products = state.products.filter((p) => p.id !== id);
      }
    },
    addDeleteProduct(state, action) {
      const id = action.payload;
      state.products = state.products.filter((p) => p.id !== id);
    },
    addclearCart(state) {
      state.products = [];
    },
  },
});

export const {
  addProductToCart,
  addclearCart,
  addDeleteProduct,
  addPlusQuantity,
  addMinusQuantity,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
