import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { setAccessToken } from '../axiosInstans.js';
import axios from 'axios';


export const checkSession = createAsyncThunk(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      const token = res.data?.data?.accessToken;
      setAccessToken(token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/register',
  async (dataUser, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', dataUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk('auth/login', async (dataUser, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', dataUser, {
      requiresAuth: false,
    });
    const token = response.data.accessToken;
    setAccessToken(token);    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    setAccessToken(null);
    const response = await api.post('/auth/logout', {}, { requiresAuth: false });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Logout failed');
  }
});


export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.accessToken;
      setAccessToken(token);
      const response = await api.get('/auth/current');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshSession = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/refresh', {}, { withCredentials: true });
    const token = response.data?.data?.accessToken;
    if (!token) {
      throw new Error('Токен не знайдений у відповіді сервера');
    }
    setAccessToken(token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (dataUser, { rejectWithValue }) => {
  try {
    const response = await api.patch('/auth/updateUser', dataUser);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});