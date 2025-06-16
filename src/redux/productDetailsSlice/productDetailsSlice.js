import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    setProductDetails: (state, action) => action.payload,
    clearProductDetails: () => null,
  },
});

export const { setProductDetails, clearProductDetails } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
