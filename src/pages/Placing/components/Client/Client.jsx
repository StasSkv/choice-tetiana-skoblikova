import { CartLink } from '../../../../components/Navigation/NavigationComponents/CartLink/CartLink.jsx';
import s from './Client.module.css';

export const Client = ({ formik }) => {
  return (
    <div className={s.client}>
      <h3>1. Отримувач</h3>

      <div className={s.clientWrap}>
      <div className={s.inputsWrap}>
            <label></label>
            <input type="text" name="fullName" value={formik.values.fullName} readOnly />
    
            <label></label>
            <input type="email" name="email" value={formik.values.email} readOnly />
    
            <label></label>
            <input type="text" name="phone" value={formik.values.phone} readOnly />
      </div>
<div className={s.cart}>
    <h4>Переглянути кошик</h4>
            <CartLink />
</div>
      </div>
    </div>
  );
};
