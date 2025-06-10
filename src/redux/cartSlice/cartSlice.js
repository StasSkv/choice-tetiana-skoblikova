import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCart(state, action) {
      state.products.push(action.payload);
    },
    addclearCart(state) {
      state.products = [];
    },
    addDeleteProduct(state, action) {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    addPlusQuantity(state, action) {
      const id = action.payload;
      state.products = state.products.map((product) =>
        product.id === id ? { ...product, quantity: (product.quantity || 1) + 1 } : product
      );
    },
    addMinusQuantity(state, action) {
      const id = action.payload;
      state.products = state.products.map((product) =>
        product.id === id ? { ...product, quantity: (product.quantity || 1) - 1 } : product
      );
    },
  },
});

export const { addProductToCart, addclearCart, addDeleteProduct, addPlusQuantity, addMinusQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
