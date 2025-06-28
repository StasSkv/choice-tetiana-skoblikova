import s from './Client.module.css';
import { CartLink } from '../../../../components/Navigation/NavigationComponents/CartLink/CartLink.jsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../../redux/authSlice/authSelectors.js';
import clsx from 'clsx';

export const Client = ({ formik }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.client}>
      <h3>1. Отримувач</h3>

      <div className={s.clientWrap}>
        <div className={s.inputsWrap}>
          <div className={s.inputWrap}>
            <label className={s.label} htmlFor="fullName">
              Ім'я <span className={s.required}>*</span>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Введіть ваше ім'я"
              readOnly={isLoggedIn}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={clsx(s.input, isLoggedIn ? s.inputReadOnly : s.inputActive)}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className={s.error}>{formik.errors.fullName}</p>
            )}
          </div>

          <div className={s.inputWrap}>
            <label className={s.label} htmlFor="phone">
              Телефон <span className={s.required}>*</span>
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="Введіть ваш номер телефону"
              readOnly={isLoggedIn}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={clsx(s.input, isLoggedIn ? s.inputReadOnly : s.inputActive)}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className={s.error}>{formik.errors.phone}</p>
            )}
          </div>
          <div className={s.inputWrap}>
            <label className={s.label} htmlFor="email">
              E-mail <span className={s.optional}>(не обов'язково)</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Введіть вашу електронну пошту"
              readOnly={isLoggedIn}
              value={formik.values.email}
              onChange={formik.handleChange}
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
