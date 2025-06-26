export const recalculateTotal = (products) => {
  return products.reduce((sum, p) => sum + p.totalPriceProduct, 0);
};