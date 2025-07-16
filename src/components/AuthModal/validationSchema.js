import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  authType: Yup.string().required(),
  name: Yup.string()
    .min(2, 'Ім’я повинно містити не менше 2 символів')
    .max(100, 'Ім’я повинно містити не більше 100 символів')
    .when('authType', {
      is: 'register',
      then: (schema) => schema.required('Ім’я є обов’язковим'),
      otherwise: (schema) => schema.notRequired(),
    }),
  phone: Yup.string()
    .matches(/^\+?\d{9,15}$/, 'Телефон повинен бути в форматі +380XXXXXXXXX')
    .min(13, 'Телефон повинен бути в форматі +380XXXXXXXXX')
    .max(13, 'Телефон повинен бути в форматі +380XXXXXXXXX')
    .required('Введіть номер телефону'),
  password: Yup.string()
    .min(6, 'Пароль повинен містити не менше 6 символів')
    .max(50, 'Пароль повинен містити не більше 50 символів')
    .required('Пароль є обов’язковим'),
});
