import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axiosInstans.js';
import { selectIsLoggedIn } from '../authSlice/authSelectors.js';

export const createOrder = createAsyncThunk('orders', async (orderData, thunkAPI) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const createOrderNotAuthorized = createAsyncThunk(
  'orders/notAuthorized',
  async (orderData, thunkAPI) => {
    try {
      const response = await api.post('/orders/not-auth', orderData, {
        requiresAuth: false,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const isLoggedIn = selectIsLoggedIn(state);
    try {
      if (!isLoggedIn) return rejectWithValue('Потрібно авторизуватися');
      const response = await api.get('/orders/userOrders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
