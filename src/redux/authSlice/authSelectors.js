export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsOpen = (state) => state.auth.loginModalIsOpen;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsLoggingOut = (state) => state.auth.isLoggingOut;
export const selectIsRegister = (state) => state.auth.isRegister;