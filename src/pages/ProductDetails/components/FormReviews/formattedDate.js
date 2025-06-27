  export const getFormattedDate = (date) => {
    const now = new Date(date);
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const formatted = now.toLocaleDateString('uk-UA', options);
    return formatted;
  };