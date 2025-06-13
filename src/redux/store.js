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

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const favoritesPersistConfig = {
  key: 'favorites',
  version: 1,
  storage,
};

const persistProductsConfig = {
  key: 'favorites',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);
const persistedProductsReducer = persistReducer(persistProductsConfig, productsReducer);

export const store = configureStore({
  reducer: {
    products: persistedProductsReducer,
    cart: persistedReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
