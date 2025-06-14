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
import cartSlice from './cartSlice/cartSlice.js';
import productsReducer from './productsSlice/productsSlice.js';
import favoritesReducer from './favoritesSlice/favoritesSlice.js';

const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
};

const favoritesPersistConfig = {
  key: 'favorites',
  version: 1,
  storage,
};

const productsPersistConfig = {
  key: 'products',
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, cartSlice),
    favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
    products: persistReducer(productsPersistConfig, productsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
