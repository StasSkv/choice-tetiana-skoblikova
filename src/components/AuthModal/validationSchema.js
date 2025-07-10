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
    .min(10, 'Телефон повинен містити не менше 10 символів')
    .max(20, 'Телефон повинен містити не більше 10 символів')
    .required('Телефон є обов’язковим'),
  password: Yup.string()
    .min(6, 'Пароль повинен містити не менше 6 символів')
    .max(50, 'Пароль повинен містити не більше 50 символів')
    .required('Пароль є обов’язковим'),
});
