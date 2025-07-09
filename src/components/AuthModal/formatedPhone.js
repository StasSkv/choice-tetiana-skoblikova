export const formatPhoneNumber = (raw) => {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    digits = '380' + digits.slice(1);
  }
  if (!digits.startsWith('380')) {
    digits = '380' + digits;
  }
  return '+' + digits;
};
