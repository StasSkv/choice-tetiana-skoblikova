import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { selectIsLoggedIn } from '../authSlice/authSelectors.js';

export const fetchProductsInFavorites = createAsyncThunk(
  'favorites/fetchProductsInFavorites',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/favorites');
      return response.data.products;
    } catch (error) {
      toast.error('Помилка при завантаженні кошику');
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
      const response = await axios.post(
        '/favorites/not-authorized',
        { productIds: localFavoritesIds },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error('Помилка при завантаженні улюблених товарів');
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
      const response = await axios.post('/favorites', { productId });
      return response.data.products;
    } catch (error) {
      toast.error('Помилка при додаванні товару до кошику');
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
      const response = await axios.delete('/favorites', { data: { productId } });
      return response.data;
    } catch (error) {
      toast.error('Помилка при видаленні товару з кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearFavorites = createAsyncThunk('favorites/clearFavorites', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const isLoggedIn = selectIsLoggedIn(state);
  try {
    if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
    const response = await axios.delete('/favorites');
    return response.data;
  } catch (error) {
    toast.error('Помилка при очищенні кошику');
    return thunkAPI.rejectWithValue(error.message);
  }
});
