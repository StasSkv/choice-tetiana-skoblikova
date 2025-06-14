import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState: {
    favoritesProducts: [],
  },
  reducers: {
    addProductToFavorites(state, action) {
      const id = action.payload;
      if (!state.favoritesProducts.includes(id)) {
        state.favoritesProducts.push(id);
      }
    },
    removeProductFromFavorites(state, action) {
      const id = action.payload;
      state.favoritesProducts = state.favoritesProducts.filter((favId) => favId !== id);
    },
  },
});

export const { addProductToFavorites, removeProductFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
