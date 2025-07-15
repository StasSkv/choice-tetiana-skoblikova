import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axiosInstans.js';

export const fetchAllReviews = createAsyncThunk('reviews/fetchAllReviews', async (_, thunkAPI) => {
  try {
    const response = await api.get('/reviews', { requiresAuth: false });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchReviewsByUserId = createAsyncThunk('reviews/fetchReviewsByUserId', async (_, thunkAPI) => {
  try {
    const response = await api.get(`/reviews/user-reviews`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchReviewsByProductId = createAsyncThunk('reviews/fetchReviewsByProductId', async (productId, thunkAPI) => {
  try {
    const response = await api.get(`/reviews/product/${productId}`, { requiresAuth: false });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createReview = createAsyncThunk('reviews/createReview', async (review, thunkAPI) => {
  try {    
    const response = await api.post('/reviews', review);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});