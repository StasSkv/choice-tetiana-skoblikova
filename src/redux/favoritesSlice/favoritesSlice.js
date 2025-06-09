import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState: {
    favoritesProducts: [],
  },
  reducers: {
    addProductToFavorites(state, action) {
      state.favoritesProducts.push(action.payload);
    },
    removeProductFromFavorites(state, action) {
      state.favoritesProducts = state.favoritesProducts.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addProductToFavorites, removeProductFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
