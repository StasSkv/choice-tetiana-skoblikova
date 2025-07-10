import { BsCart4 } from 'react-icons/bs';
import s from './CartLink.module.css';
import CustomModal from '../../../CustomModal/CustomModal.jsx';
import { useState } from 'react';
import { Cart } from '../../../../pages/Cart/Cart.jsx';
import { useSelector } from 'react-redux';
import { selectCartProducts, selectTotalPriceCart } from '../../../../redux/cartSlice/cartSelectors.js';

export const CartLink = ({ animate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const productInCart = useSelector(selectCartProducts);
  const totalPriceCart = useSelector(selectTotalPriceCart);
  const count = productInCart.length;

  return (
    <>
      <button
        className={s.navLinkCart}
        type="button"
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
            {totalPriceCart ? totalPriceCart.toLocaleString('uk-UA', {
              style: 'currency',
              currency: 'UAH',
            }) : Number(0).toLocaleString('uk-UA', {
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
        <Cart onClose={() => setModalIsOpen(false)} />
      </CustomModal>
    </>
  );
};
