import s from './Client.module.css';
import { CartLink } from '../../../../components/Navigation/NavigationComponents/CartLink/CartLink.jsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../../redux/authSlice/authSelectors.js';
import clsx from 'clsx';
import { Field, ErrorMessage } from 'formik';
import { useId } from 'react';

export const Client = () => {
  const nameFieldId = useId();
  const phoneFieldId = useId();
  const emailFieldId = useId();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.client}>
      <h3>1. Отримувач</h3>
      <div className={s.clientWrap}>
        <div className={s.inputsWrap}>
          <div className={s.inputWrap}>
            <label className={s.label} htmlFor={nameFieldId}>
              Ім'я <span className={s.required}>*</span>
              <ErrorMessage name="name" component="span" className={s.error} />
            </label>
            <Field
              id={nameFieldId}
              name="name"
              type="text"
              placeholder="Введіть ваше ім'я"
              readOnly={isLoggedIn}
              className={clsx(s.input, isLoggedIn ? s.inputReadOnly : s.inputActive)}
            />
          </div>

          <div className={s.inputWrap}>
            <label className={s.label} htmlFor={phoneFieldId}>
              Телефон <span className={s.required}>*</span>
              <ErrorMessage name="phone" component="span" className={s.error} />
            </label>
            <Field
              id={phoneFieldId}
              name="phone"
              type="text"
              placeholder="Введіть ваш номер телефону"
              readOnly={isLoggedIn}
              className={clsx(s.input, isLoggedIn ? s.inputReadOnly : s.inputActive)}
            />
          </div>
          <div className={s.inputWrap}>
            <label className={s.label} htmlFor={emailFieldId}>
              E-mail <span className={s.optional}>(не обов'язково)</span>
              <ErrorMessage name="email" component="span" className={s.error} />
            </label>
            <Field
              id={emailFieldId}
              name="email"
              type="email"
              placeholder="Введіть вашу електронну пошту"
              readOnly={isLoggedIn}
              className={clsx(s.input, isLoggedIn ? s.inputReadOnly : s.inputActive)}
            />
          </div>
        </div>
        <div className={s.cart}>
          <h4>Переглянути кошик</h4>
          <div className={s.arrowDownWrapper}>
            <span className={s.arrow}></span>
            <span className={s.arrow}></span>
            <span className={s.arrow}></span>
          </div>
          <CartLink />
        </div>
      </div>
    </div>
  );
};
