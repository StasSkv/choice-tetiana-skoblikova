import { createSlice } from '@reduxjs/toolkit';
import { createReview, fetchReviewsByProductId, fetchReviewsByUserId } from './reviewsOperations';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    userReviews: [],
    productReviews: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviewsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchReviewsByUserId.fulfilled, (state, action) => {
        state.userReviews = action.payload;
      })
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.productReviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.productReviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;  
        state.error = action.payload;
      })
  },
});

export const reviewsReducer = reviewsSlice.reducer;
