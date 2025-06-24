import { createSelector } from '@reduxjs/toolkit';
import { selectAllProducts } from '../productsSlice/productsSelectors.js';

export const selectProductsInCart = (state) => state.cart.products;

export const selectCartTotal = createSelector(
  [selectProductsInCart, selectAllProducts],
  (cartProducts, allProducts) => {
    return cartProducts.reduce((sum, cartItem) => {
      const product = allProducts.find((p) => p.id === cartItem.id);
      if (!product) return sum;
      return sum + product.price * cartItem.quantity;
    }, 0);
  }
);
