export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectIsLoading = (state) => state.order.isLoading;
export const selectError = (state) => state.order.error;