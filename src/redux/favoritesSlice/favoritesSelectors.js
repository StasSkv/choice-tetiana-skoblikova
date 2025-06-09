export const selectFavoritesProducts = (state) => state.favorites.favoritesProducts;

export const makeSelectIsProductFavorite = (productId) => (state) =>
  state.favorites.favoritesProducts.some((item) => item.id === productId);