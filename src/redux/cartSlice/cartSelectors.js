import { createSelector } from '@reduxjs/toolkit';

export const selectIsCartEmpty = (state) => state.cart.products.length === 0;

export const selectTotalPriceCart = (state) => state.cart.totalPriceCart;

export const selectProductsIds = (state) => state.cart.productsIds;

const selectCart = (state) => state.cart;

export const selectCartProducts = createSelector([selectCart], (cart) => cart.products || []);

export const selectIsCartLoading = (state) => state.cart.isLoading;
