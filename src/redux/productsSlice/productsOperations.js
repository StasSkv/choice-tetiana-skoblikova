import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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

      const res = await axios.get('/products', {
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
      const res = await axios.get(`/products/${productId}`);
      return { data: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
