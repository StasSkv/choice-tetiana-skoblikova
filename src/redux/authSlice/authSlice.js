import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  refreshSession,
  updateUser,
  checkSession,
} from './authOperations.js';

const initialState = {
  user: null,
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
        state.user = action.payload.data.user;
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
        state.user = action.payload.data;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkSession.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkSession.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const authReducer = authSlice.reducer;

export const { setLoginModalIsOpen } = authSlice.actions;
