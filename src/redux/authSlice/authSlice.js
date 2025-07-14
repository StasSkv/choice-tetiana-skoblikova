import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  refreshSession,
  updateUser,
} from './authOperations.js';

const initialState = {
  user: {
    name: null,
    phone: null,
    email: null,
    deliveryOption: {
      method: '',
      city: '',
      department: '',
    },
    paymentOption: {
      method: '',
      cardNumber: '',
      cardExpiration: '',
    },
    createdAt: '',
  },
  isRegister: false,
  isLoggedIn: false,
  isLoggingOut: false,
  isRefreshing: false,
  loginModalIsOpen: false,
  isLoading: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoginModalIsOpen: (state, action) => {
      state.loginModalIsOpen = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegister = false;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegister = true;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isRegister = false;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRegister = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
        state.isLoggingOut = true;
      })
      .addCase(logoutUser.fulfilled, () => {
        return {
          ...initialState,
          isLoading: false,
          isLoggingOut: false,
        };
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isLoggingOut = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.user = action.payload.data.user;
        state.isLoading = false;
      })
      .addCase(refreshSession.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.name = action.payload.data.user.name;
        state.user.phone = action.payload.data.user.phone;
        state.user.email = action.payload.data.user.email;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const authReducer = authSlice.reducer;

export const { setLoginModalIsOpen } = authSlice.actions;
