import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    firstName: 'Andriy',
    lastName: 'Kovalenko',
    email: 'stas000123@gmail.com',
    phone: '0953835492',
    deliveryOption: {
      method: 'Nova_Poshta',
      city: 'Глухів',
      department: 'Відділення №2',
    },
    paymentOption: {
      method: 'overpayment',
      cardNumber: '',
      cardExpiration: '',
    },
  },
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
});

export const authReducer = authSlice.reducer;
