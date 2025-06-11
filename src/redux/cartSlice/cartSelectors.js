import { createSelector } from '@reduxjs/toolkit';

export const selectProductsInCart = (state) => state.cart.products;

export const makeSelectIsProductInCart = (productId) =>
  createSelector([selectProductsInCart], (productsInCart) =>
    productsInCart.some((item) => item.id === productId)
  );
