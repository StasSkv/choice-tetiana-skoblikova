import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchProductsInCart = createAsyncThunk(
  'cart/fetchProductsInCart',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cart');
      return response.data.products;
    } catch (error) {
      toast.error('Помилка при завантаженні кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post('/cart', { productId });
      return response.data;
    } catch (error) {
      toast.error('Помилка при додаванні товару до кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  'cart/deleteProductFromCart',
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(`/cart`, { data: { productId } });
      return response.data;
    } catch (error) {
      toast.error('Помилка при видаленні товару з кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, thunkAPI) => {
    try {
      const response = await axios.put(`/cart`);
      return response.data;
    } catch (error) {
      toast.error('Помилка при очищенні кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);