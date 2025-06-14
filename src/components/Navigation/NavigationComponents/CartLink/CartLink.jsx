import { BsCart4 } from 'react-icons/bs';
import s from './CartLink.module.css';
import CustomModal from '../../../CustomModal/CustomModal.jsx';
import { useState } from 'react';
import { Cart } from '../../../../pages/Cart/Cart.jsx';
import { useSelector } from 'react-redux';
import { selectProductsInCart } from '../../../../redux/cartSlice/cartSelectors.js';
import { selectAllProducts } from '../../../../redux/productsSlice/productsSelectors.js';

export const CartLink = ({ animate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const productInCart = useSelector(selectProductsInCart);
  const allProducts = useSelector(selectAllProducts);

  const order = productInCart.reduce((total, cartItem) => {
    const product = allProducts.find((p) => p.id === cartItem.id);
    if (product) {
      return total + product.price * cartItem.quantity;
    }
    return total;
  }, 0);

  const formatted = order.toLocaleString('uk-UA');

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
            {formatted} <span className={s.currency}>грн</span>
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
      >
        <Cart onClose={() => setModalIsOpen(false)} />
      </CustomModal>
    </>
  );
};
