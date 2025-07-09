export const selectLoading = (state) => state.products.isLoading;

export const selectError = (state) => state.products.error;

export const selectAllProducts = (state) => state.products.items;

export const selectPriceProduct = (state, id) => {
  return state.products.items.find((product) => product.id === id)?.price;
};

export const selectProductById = (state) => state.products.currentItem;

export const selectPaginationData = (state) => state.products.paginationData;

export const selectFilters = (state) => state.products.filters;
