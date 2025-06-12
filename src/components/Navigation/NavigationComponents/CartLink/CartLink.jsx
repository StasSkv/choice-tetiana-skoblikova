import { BsCart4 } from 'react-icons/bs';
import s from './CartLink.module.css';
import CustomModal from '../../../CustomModal/CustomModal.jsx';
import { useState } from 'react';
import { Cart } from '../../../../pages/Cart/Cart.jsx';
import { useSelector } from 'react-redux';
import { selectProductsInCart } from '../../../../redux/cartSlice/cartSelectors.js';

export const CartLink = ({ count, totalSum, animate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const productInCart = useSelector(selectProductsInCart);
  const order = productInCart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  const formatted = order.toLocaleString('uk-UA');

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
            {totalSum} <span className={s.currency}>грн</span>
          </p>
        </div>
        <BsCart4 className={s.cart} />
      </button>

      <CustomModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
        submitBtn={'Оформити замовлення'}
        order={formatted}
        children={<Cart onClose={() => setModalIsOpen(false)} />}
      ></CustomModal>
    </>
  );
};
