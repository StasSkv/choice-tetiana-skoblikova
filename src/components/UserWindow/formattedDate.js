export const formattedDate = (date) => {
  const rawDate = date;
  const dateNew = new Date(rawDate);

  const formatted = dateNew.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/Kyiv',
  });

  return formatted;
};
