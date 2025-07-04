import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { selectIsLoggedIn } from '../authSlice/authSelectors.js';

export const fetchProductsInCart = createAsyncThunk(
  'cart/fetchProductsInCart',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cart');
      return response.data;
    } catch (error) {
      toast.error('Помилка при завантаженні кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductsInCartFromLocal = createAsyncThunk(
  'cart/fetchProductsInCartFromLocal',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const localProductsIds = state.cart?.productsIds || [];
      if (!localProductsIds.length) {
        return [];
      }
      const response = await axios.post(
        '/cart/not-authorized',
        { productIds: localProductsIds },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error('Помилка при завантаженні кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (productId, thunkAPI) => {
    const state = thunkAPI.getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
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
    const state = thunkAPI.getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
      const response = await axios.delete(`/cart`, { data: { productId } });
      return response.data;
    } catch (error) {
      toast.error('Помилка при видаленні товару з кошику');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPlusQuantity = createAsyncThunk(
  'cart/addPlusQuantity',
  async ({ productId, quantity }, thunkAPI) => {
    const state = thunkAPI.getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
      const response = await axios.patch(`/cart`, { productId, quantity });
      return response.data;
    } catch (error) {
      toast.error('Помилка при додаванні кількості товару');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addMinusQuantity = createAsyncThunk(
  'cart/addMinusQuantity',
  async ({ productId, quantity }, thunkAPI) => {
    const state = thunkAPI.getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
      const response = await axios.patch(`/cart`, { productId, quantity });
      return response.data;
    } catch (error) {
      toast.error('Помилка при зменшенні кількості товару');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const isLoggedIn = selectIsLoggedIn(state);
  try {
    if (!isLoggedIn) return thunkAPI.rejectWithValue('Потрібно авторизуватися');
    const response = await axios.put(`/cart`);
    return response.data;
  } catch (error) {
    toast.error('Помилка при очищенні кошику');
    return thunkAPI.rejectWithValue(error.message);
  }
});
