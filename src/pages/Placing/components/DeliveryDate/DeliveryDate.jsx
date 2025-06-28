export const DeliveryDate = () => {
  const getDatePlus36Hours = () => {
    const now = new Date();
    now.setHours(now.getHours() + 36);

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <p>
      Орієнтовна дата доставки <span>{getDatePlus36Hours()}</span>
    </p>
  );
};

export default DeliveryDate;
