import { NavLink } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import s from './CartLink.module.css';

export const CartLink = ({ count, totalSum, animate }) => (
  <NavLink to="/cart" className={s.navLinkCart}>
    <div className={s.totalSumWrap}>
      {count > 0 && (
        <span className={`${s.counter} ${s.counterShow} ${animate ? s.bounce : ''}`}>
          {count} <span className={s.currency}>x</span>
        </span>
      )}
      <p className={s.totalSum}>
        {totalSum} <span className={s.currency}>грн</span>
      </p>
    </div>
    <BsCart4 className={s.cart} />
  </NavLink>
);
