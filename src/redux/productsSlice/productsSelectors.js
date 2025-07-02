export const selectLoading = (state) => state.products.isLoading;

export const selectError = (state) => state.products.error;

export const selectAllProducts = (state) => state.products.items;

export const selectPriceProduct = (state, id) => {
  return state.products.items.find((product) => product.id === id)?.price;
};

export const selectProductById = (id) => (state) => {
  return state.products.currentItem?.id === id
    ? state.products.currentItem
    : state.products.items.find((p) => p.id === id);
};

export const selectPaginationData = (state) => state.products.paginationData;