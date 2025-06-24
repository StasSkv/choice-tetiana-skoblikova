import { createSelector } from '@reduxjs/toolkit';
import { selectAllProducts } from '../productsSlice/productsSelectors.js';

export const selectFavoritesProductsIds = (state) => state.favorites.favoritesProducts;

export const selectFavoritesProducts = createSelector(
  [selectFavoritesProductsIds, selectAllProducts],
  (favoritesProducts, allProducts) => {
    return favoritesProducts.map((id) => allProducts.find((product) => product.id === id));
  }
);