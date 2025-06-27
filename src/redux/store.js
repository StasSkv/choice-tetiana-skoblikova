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

const productsPersistConfig = {
  key: 'products',
  storage,
  whitelist: ['currentItem'],
};

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

export const store = configureStore({
  reducer: {
    products: persistReducer(productsPersistConfig, productsReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
