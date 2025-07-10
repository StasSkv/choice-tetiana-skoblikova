import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { selectIsLoggedIn } from '../authSlice/authSelectors.js';
import api from '../axiosInstans.js';

export const fetchProductsInCart = createAsyncThunk(
  'cart/fetchProductsInCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      toast.error('Помилка при завантаженні кошику');
      return rejectWithValue(error.message);
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
      const response = await api.post(
        '/cart/not-authorized',
        { productIds: localProductsIds },
        { requiresAuth: false },
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
  async (productId, { getState, rejectWithValue }) => {
    const state = getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return rejectWithValue('Потрібно авторизуватися');
      const response = await api.post('/cart', { productId });
      return response.data;
    } catch (error) {
      toast.error('Помилка при додаванні товару до кошику');
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  'cart/deleteProductFromCart',
  async (productId, { getState, rejectWithValue }) => {
    const state = getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return rejectWithValue('Потрібно авторизуватися');
      const response = await api.delete(`/cart`, { data: { productId } });
      return response.data;
    } catch (error) {
      toast.error('Помилка при видаленні товару з кошику');
      return rejectWithValue(error.message);
    }
  }
);

export const addPlusQuantity = createAsyncThunk(
  'cart/addPlusQuantity',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    const state = getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return rejectWithValue('Потрібно авторизуватися');
      const response = await api.patch(`/cart`, { productId, quantity });
      return response.data;
    } catch (error) {
      toast.error('Помилка при додаванні кількості товару');
      return rejectWithValue(error.message);
    }
  }
);

export const addMinusQuantity = createAsyncThunk(
  'cart/addMinusQuantity',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    const state = getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return rejectWithValue('Потрібно авторизуватися');
      const response = await api.patch(`/cart`, { productId, quantity });
      return response.data;
    } catch (error) {
      toast.error('Помилка при зменшенні кількості товару');
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return rejectWithValue('Потрібно авторизуватися');
      const response = await api.put(`/cart`);
      return response.data;
    } catch (error) {
      toast.error('Помилка при очищенні кошику');
      return rejectWithValue(error.message);
    }
  }
);
