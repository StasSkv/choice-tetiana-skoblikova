import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axiosInstans.js';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async ({ filters = {} } = {}, thunkAPI) => {
    try {
      const { page = 1, perPage = 20, sortBy = '_id', sortOrder = 'asc', category = 'all' } = filters;

      const queryParams = {
        page,
        perPage,
        sortBy,
        sortOrder,
        category,
      };
      const res = await api.get('/products', {
        requiresAuth: false,
        params: queryParams,
      });
      return {
        data: {
          products: res.data.data.products,
          paginationData: res.data.data.paginationData,
        },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, thunkAPI) => {
    try {
      const res = await api.get(`/products/${productId}`, { requiresAuth: false });
      console.log(res.data.data);
      return { data: res.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
