import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProductsInFavorites,
  addProductToFavorites,
  removeProductFromFavorites,
  clearFavorites,
  fetchFavoritesFromLocal,
} from './favoritesOperations';

const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState: {
    favoritesProducts: [],
    favoritesIds: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addProductToFavoritesLocal: (state, action) => {
      state.favoritesIds.push(action.payload);
    },
    removeProductFromFavoritesLocal: (state, action) => {
      state.favoritesIds = state.favoritesIds.filter((favId) => favId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsInFavorites.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsInFavorites.fulfilled, (state, action) => {
      state.favoritesProducts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProductsInFavorites.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchFavoritesFromLocal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFavoritesFromLocal.fulfilled, (state, action) => {
      state.favoritesProducts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchFavoritesFromLocal.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(addProductToFavorites.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProductToFavorites.fulfilled, (state, action) => {
      state.favoritesProducts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addProductToFavorites.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(removeProductFromFavorites.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeProductFromFavorites.fulfilled, (state, action) => {
      state.favoritesProducts = state.favoritesProducts.filter(
        (product) => product._id !== action.payload
      );
      state.isLoading = false;
    });
    builder.addCase(removeProductFromFavorites.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(clearFavorites.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clearFavorites.fulfilled, (state) => {
      state.favoritesProducts = [];
      state.isLoading = false;
    });
    builder.addCase(clearFavorites.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { addProductToFavoritesLocal, removeProductFromFavoritesLocal, clearFavoritesLocal } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
