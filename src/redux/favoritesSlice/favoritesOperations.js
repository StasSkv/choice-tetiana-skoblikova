import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

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

export const addProductToFavorites = createAsyncThunk(
  'favorites/addProductToFavorites',
  async (productId, thunkAPI) => {
    try {
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
    try {
      const response = await axios.delete('/favorites', { data: { productId } });
      return response.data;
    } catch (error) {
      toast.error('Помилка при видаленні товару з кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearFavorites = createAsyncThunk('favorites/clearFavorites', async (_, thunkAPI) => {
  try {
    const response = await axios.delete('/favorites');
    return response.data;
  } catch (error) {
    toast.error('Помилка при очищенні кошику');
    return thunkAPI.rejectWithValue(error.message);
  }
});
