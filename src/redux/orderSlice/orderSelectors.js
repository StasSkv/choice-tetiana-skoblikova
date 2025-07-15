export const selectUserOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectIsLoadingOrders = (state) => state.order.isLoading;
export const selectErrorOrders = (state) => state.order.error;