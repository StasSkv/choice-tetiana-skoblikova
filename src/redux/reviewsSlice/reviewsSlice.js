import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: {},
  },
  reducers: {
    addReview(state, action) {
      const { id, name, review, date, rating } = action.payload;
      if (!state.items[id]) {
        state.items[id] = [];
      }
      state.items[id].push({ id: Date.now(), name, review, date, rating });
    },
  },
});

export const { addReview } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
