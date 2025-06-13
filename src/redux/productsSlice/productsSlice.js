import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../products';

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: {
    products,
  },
  reducers: {
    addUpdateProductRating(state, action) {
      const { id, value } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product) {
        if (!product.rating) {
          product.rating = [];
        }
        product.rating = [...product.rating, value];
      }
    },
  },
});

console.log(products);

export const { addUpdateProductRating } = productsSlice.actions;

export default productsSlice.reducer;
