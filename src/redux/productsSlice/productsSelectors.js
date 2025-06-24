export const selectLoading = (state) => state.products.isLoading;

export const selectAllProducts = (state) => state.products.items;

export const selectProductById = (id) => (state) => {
  return state.products.currentItem?.id === id
    ? state.products.currentItem
    : state.products.items.find((p) => p.id === id);
};
