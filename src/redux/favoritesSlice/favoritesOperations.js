import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectIsLoggedIn } from '../authSlice/authSelectors.js';
import api from '../axiosInstans.js';

export const fetchProductsInFavorites = createAsyncThunk(
  'favorites/fetchProductsInFavorites',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/favorites');
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavoritesFromLocal = createAsyncThunk(
  'favorites/fetchFavoritesFromLocal',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const localFavoritesIds = state.favorites?.favoritesIds || [];
      if (!localFavoritesIds.length) {
        return [];
      }
      const response = await api.post(
        '/favorites/not-authorized',
        { productIds: localFavoritesIds },
        { requiresAuth: false },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductToFavorites = createAsyncThunk(
  'favorites/addProductToFavorites',
  async (productId, thunkAPI) => {
    const state = thunkAPI.getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
      const response = await api.post('/favorites', { productId });
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProductFromFavorites = createAsyncThunk(
  'favorites/removeProductFromFavorites',
  async (productId, thunkAPI) => {
    const state = thunkAPI.getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
      const response = await api.delete('/favorites', { data: { productId } });
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearFavorites = createAsyncThunk('favorites/clearFavorites', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const isLoggedIn = selectIsLoggedIn(state);
  try {
    if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
    const response = await api.put('/favorites');
    return response.data;
  } catch (error) { 
    return thunkAPI.rejectWithValue(error.message);
  }
});
