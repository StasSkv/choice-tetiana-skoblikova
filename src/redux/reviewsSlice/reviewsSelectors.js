import { createSelector } from '@reduxjs/toolkit';

export const selectReviews = (state) => state.reviews.items;

export const selectReviewsById = (id) =>
  createSelector([selectReviews], (reviews) => reviews[id] || []);
