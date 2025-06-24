import { BsCart4 } from 'react-icons/bs';
import s from './CartLink.module.css';
import CustomModal from '../../../CustomModal/CustomModal.jsx';
import { useState } from 'react';
import { Cart } from '../../../../pages/Cart/Cart.jsx';
import { useSelector } from 'react-redux';
import {
  selectProductsInCart,
  selectCartTotal,
} from '../../../../redux/cartSlice/cartSelectors.js';

export const CartLink = ({ animate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const productInCart = useSelector(selectProductsInCart);
  const cartSum = useSelector(selectCartTotal);
  const count = productInCart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <button
        className={s.navLinkCart}
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <div className={s.totalSumWrap}>
          {count > 0 && (
            <span className={`${s.counter} ${s.counterShow} ${animate ? s.bounce : ''}`}>
              {count} <span className={s.currency}>x</span>
            </span>
          )}
          <p className={s.totalSum}>
            {cartSum.toLocaleString('uk-UA', {
              style: 'currency',
              currency: 'UAH',
            })}
          </p>
        </div>
        <BsCart4 className={s.cart} />
      </button>

      <CustomModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <Cart />
      </CustomModal>
    </>
  );
};
