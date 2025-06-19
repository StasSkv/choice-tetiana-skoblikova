  export const getFormattedDate = () => {
    const now = new Date();

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const formatted = now.toLocaleDateString('uk-UA', options);
    return formatted;
  };