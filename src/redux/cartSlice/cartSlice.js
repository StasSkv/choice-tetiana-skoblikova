import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart,
  deleteProductFromCart,
  fetchProductsInCart,
  clearCart,
  addPlusQuantity,
  addMinusQuantity,
} from './cartOperations';
import { recalculateTotal } from './utils';

const initialState = {
  products: [],
  totalPriceCart: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCartLocal: (state, action) => {
      state.products.push(action.payload);
      state.totalPriceCart += Number(action.payload.price);
    },
    deleteProductFromCartLocal: (state, action) => {
      const product = state.products.find((p) => p.productId === action.payload);
      if (product) {
        state.products = state.products.filter((product) => product.productId !== action.payload);
        state.totalPriceCart -= Number(product.price * product.quantity);
      }
    },
    clearCartLocal: (state) => {
      state.products = [];
      state.totalPriceCart = 0;
    },
    addPlusQuantityLocal: (state, action) => {
      const product = state.products.find((p) => p.productId === action.payload);
      if (product) {
        product.quantity += 1;
        product.totalPriceProduct = product.quantity * Number(product.price);
        state.totalPriceCart = recalculateTotal(state.products);
      }
    },
    addMinusQuantityLocal: (state, action) => {
      const product = state.products.find((p) => p.productId === action.payload);
      if (product) {
        product.quantity -= 1;
        product.totalPriceProduct = product.quantity * Number(product.price);
        state.totalPriceCart = recalculateTotal(state.products);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsInCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsInCart.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.totalPriceCart = action.payload.totalPriceCart;
      state.isLoading = false;
    });
    builder.addCase(fetchProductsInCart.rejected, (state, action) => {
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
