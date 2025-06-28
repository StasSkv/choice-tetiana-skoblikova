export const selectProductsInCart = (state) => state.cart.products;

export const selectIsCartEmpty = (state) => state.cart.products.length === 0;

export const selectTotalPriceCart = (state) => state.cart.totalPriceCart;


