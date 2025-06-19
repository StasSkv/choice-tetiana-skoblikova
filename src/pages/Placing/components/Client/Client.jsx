import { CartLink } from '../../../../components/Navigation/NavigationComponents/CartLink/CartLink.jsx';
import s from './Client.module.css';

const formik = {
  fullName: 'Тетяна Скоблікова',
  email: 'stas000123@gmail.com',
  phone: '095-383-54-92',
  city: 'Kiyv',
  order: 2223,
  deliveryMethod: 'novaPoshta',
  paymentMethod: 'payOnDelivery',
};

export const Client = () => {
  return (
    <div className={s.client}>
      <h3>1. Отримувач</h3>

      <div className={s.clientWrap}>
        <div className={s.inputsWrap}>
          <label></label>
          <input type="text" name="fullName" value={formik.fullName} readOnly />

          <label></label>
          <input type="email" name="email" value={formik.email} readOnly />

          <label></label>
          <input type="text" name="phone" value={formik.phone} readOnly />
        </div>
        <div className={s.cart}>
          <h4>Переглянути кошик</h4>
          <CartLink />
        </div>
      </div>
    </div>
  );
};
