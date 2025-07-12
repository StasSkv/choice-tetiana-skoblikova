import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .required('Введіть ім’я')
    .min(2, 'Ім’я повинно містити не менше 2 символів')
    .max(40, 'Ім’я повинно містити не більше 40 символів'),
  email: Yup.string().email('Невірний email'),
  phone: Yup.string()
    .required('Введіть номер телефону')
      .min(13, 'Телефон повинен містити не менше 13 символів')
    .max(13, 'Телефон повинен містити не більше 13 символів')
    .matches(/^\+380\d{9}$/, 'Телефон повинен бути в форматі +380XXXXXXXXX'),
  recipient: Yup.string().oneOf(['self', 'other']).required('Оберіть отримувача'),

  recipientName: Yup.string().when('recipient', {
    is: 'other',
    then: (schema) => schema.required('Введіть ім’я отримувача'),
    otherwise: (schema) => schema.notRequired(),
  }),

  recipientPhone: Yup.string().when('recipient', {
    is: 'other',
    then: (schema) => schema.required('Введіть телефон отримувача'),
    otherwise: (schema) => schema.notRequired(),
  }),

  delivery: Yup.string()
    .oneOf(['Nova_Poshta', 'Ukrposhta', 'Self'], 'Оберіть спосіб доставки')
    .required('Оберіть спосіб доставки'),
  city: Yup.string().required('Введіть місто'),
  department: Yup.string().required('Введіть відділення'),
  paymentMethod: Yup.string()
    .oneOf(['payToCard', 'overpayment', 'cash'])
    .required('Оберіть спосіб оплати'),
});
