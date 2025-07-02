import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlice/cartSlice.js';
import { productsReducer } from './productsSlice/productsSlice.js';
import { favoritesReducer } from './favoritesSlice/favoritesSlice.js';
import { reviewsReducer } from './reviewsSlice/reviewsSlice.js';
import { authReducer } from './authSlice/authSlice.js';

const productsPersistConfig = {
  key: 'products',
  storage,
  whitelist: ['currentItem', 'filters', 'paginationData'],
};

const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
  whitelist: ['productsIds'],
};

const favoritesPersistConfig = {
  key: 'favorites',
  version: 1,
  storage,
  whitelist: ['favoritesIds'],
};

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['user', 'isLoggedIn', 'isRefreshing'],
};

export const store = configureStore({
  reducer: {
    products: persistReducer(productsPersistConfig, productsReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
    reviews: reviewsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
