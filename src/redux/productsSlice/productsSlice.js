import { createSlice } from '@reduxjs/toolkit';
import { fetchProductById, fetchProducts } from './productsOperations.js';
import { logoutUser } from '../authSlice/authOperations';

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
  state.isLoading = false;
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    paginationData: null,
    filters: {
      page: 1,
      perPage: 20,
      sortBy: '_id',
      sortOrder: 'asc',
      category: 'all',
    },
    currentItem: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.items = [];
        state.paginationData = null;
        state.filters = {
          page: 1,
          perPage: 20,
          sortBy: '_id',
          sortOrder: 'asc',
          category: 'all',
        };
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.error = null;
        state.items = action.payload.data.products;
        state.paginationData = action.payload.data.paginationData;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(fetchProductById.pending, handlePending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentItem = action.payload.data;
        state.paginationData = action.payload.data.paginationData;
      })
      .addCase(fetchProductById.rejected, handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;

export const { setCurrentItem, setFilters } = productsSlice.actions;
