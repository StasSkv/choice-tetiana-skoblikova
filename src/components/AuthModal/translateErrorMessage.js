export const translateErrorMessage = (message) => {
  switch (message) {
    case 'Invalid phone or password':
      return 'Невірний номер телефону або пароль';
    case 'Phone already in use':
      return 'Користувач з таким телефоном вже зареєстрований';
    case 'User not found':
      return 'Користувача не знайдено';
    case 'Bad Request':
      return 'Некоректні дані';
    default:
      return 'Щось пішло не так';
  }
};
