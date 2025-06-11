export const selectProductsInCart = (state) => state.cart.products;

export const makeSelectIsProductInCart = (productId) => (state) =>
  state.cart.products.some((item) => item.id === productId);
