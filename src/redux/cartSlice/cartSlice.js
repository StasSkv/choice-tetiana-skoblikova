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
  },
});

export const { addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
