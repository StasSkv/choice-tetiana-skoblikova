import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  deleteProductFromCart,
  fetchProductsInCart,
  clearCart,
  addPlusQuantity,
  addMinusQuantity,
  fetchProductsInCartFromLocal,
} from './cartOperations';
import { logoutUser } from '../authSlice/authOperations';
import { isEqual } from 'lodash';

const initialState = {
  products: [],
  productsIds: [],
  totalPriceCart: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCartLocal: (state, action) => {
      state.productsIds.push(action.payload);
    },
    deleteProductFromCartLocal: (state, action) => {
      const productId = state.productsIds.find((p) => p.productId === action.payload);
      if (productId) {
        state.productsIds = state.productsIds.filter((productId) => productId.productId !== action.payload);
      }
    },
    clearCartLocal: (state) => {
      state.productsIds = [];
      state.totalPriceCart = 0;
    },
    addPlusQuantityLocal: (state, action) => {
      const productId = state.productsIds.find((p) => p.productId === action.payload);
      if (productId) {
        productId.quantity += 1;
      }
    },
    addMinusQuantityLocal: (state, action) => {
      const productId = state.productsIds.find((p) => p.productId === action.payload);
      if (productId) {
        productId.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, () => initialState);    
    builder.addCase(fetchProductsInCart.pending, (state) => {
      state.isLoading = true;
    });
  builder.addCase(fetchProductsInCart.fulfilled, (state, action) => {
    state.products = action.payload.products;
    state.totalPriceCart = action.payload.totalPriceCart;
    const newProductsIds = action.payload.products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
    }));

    if (!isEqual(state.productsIds, newProductsIds)) {
      state.productsIds = newProductsIds;
    }
  });
    builder.addCase(fetchProductsInCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProductsInCartFromLocal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsInCartFromLocal.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.totalPriceCart = action.payload.totalPriceCart;
      state.isLoading = false;
    });
    builder.addCase(fetchProductsInCartFromLocal.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addProductToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteProductFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(deleteProductFromCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(clearCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.products = [];
      state.isLoading = false;
    });
    builder.addCase(addPlusQuantity.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addPlusQuantity.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(addPlusQuantity.pending, (state) => {
      state.isLoading = true;
    });
    builder
      .addCase(addMinusQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addMinusQuantity.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.isLoading = false;
      });
    builder.addCase(addMinusQuantity.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const {
  addProductToCartLocal,
  deleteProductFromCartLocal,
  clearCartLocal,
  addPlusQuantityLocal,
  addMinusQuantityLocal,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
