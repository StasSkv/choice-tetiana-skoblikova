import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axiosInstans.js';

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
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/orders/user-orders');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


