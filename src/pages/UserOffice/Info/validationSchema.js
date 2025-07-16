import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .required('Введіть ім’я')
    .min(2, 'Ім’я повинно містити не менше 2 символів')
    .max(100, 'Ім’я повинно містити не більше 40 символів'),
  email: Yup.string().email('Невірний email'),
  phone: Yup.string()
    .matches(/^\+?\d{9,15}$/, 'Телефон повинен бути в форматі +380XXXXXXXXX')
    .min(13, 'Невірний формат телефону')
    .max(13, 'Невірний формат телефону')
    .required('Введіть номер телефону'),
  birthDate: Yup.date(),
  deliveryOptionCity: Yup.string().min(2, 'Місто повинно містити не менше 2 символів').max(50, 'Місто повинно містити не більше 50 символів'),
  deliveryOptionMethod: Yup.string().oneOf(['nova_poshta', 'ukrposhta', 'self_pickup', '']),
  deliveryOptionDepartment: Yup.string().min(1, 'Відділення повинно містити не менше 1 символів').max(50, 'Відділення повинно містити не більше 50 символів'),
});
