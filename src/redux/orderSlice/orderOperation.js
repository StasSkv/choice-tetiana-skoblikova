import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const createOrder = createAsyncThunk('orders', async (orderData, thunkAPI) => {
  try {
    const response = await axios.post('/orders', orderData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});