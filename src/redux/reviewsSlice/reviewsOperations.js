import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllReviews = createAsyncThunk('reviews/fetchAllReviews', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/reviews');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchReviewsByUserId = createAsyncThunk('reviews/fetchReviewsByUserId', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`/reviews/user/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchReviewsByProductId = createAsyncThunk('reviews/fetchReviewsByProductId', async (productId, thunkAPI) => {
  try {
    const response = await axios.get(`/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createReview = createAsyncThunk('reviews/createReview', async (review, thunkAPI) => {
  try {    
    const response = await axios.post('/reviews', review);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});