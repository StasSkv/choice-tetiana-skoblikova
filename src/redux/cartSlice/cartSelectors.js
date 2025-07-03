export const selectIsCartEmpty = (state) => state.cart.products.length === 0;

export const selectTotalPriceCart = (state) => state.cart.totalPriceCart;

export const selectProductsIds = (state) => state.cart.productsIds;

export const selectCartProducts = (state) => state.cart.products || [];
