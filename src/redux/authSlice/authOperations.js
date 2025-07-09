import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (dataUser, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', dataUser, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk('auth/login', async (dataUser, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/login', dataUser, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/logout', {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Logout failed');
  }
});

