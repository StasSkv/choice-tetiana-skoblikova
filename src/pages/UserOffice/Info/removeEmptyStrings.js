export const removeEmptyStrings = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const nested = removeEmptyStrings(value);
      if (Object.keys(nested).length > 0) {
        acc[key] = nested;
      }
    } else if (value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});
};
