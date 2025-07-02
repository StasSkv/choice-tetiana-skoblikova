import { createSlice } from '@reduxjs/toolkit';
import { fetchProductById, fetchProducts } from './productsOperations.js';

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
    currentItem: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(fetchProductById.rejected, handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;

export const { setCurrentItem } = productsSlice.actions;
