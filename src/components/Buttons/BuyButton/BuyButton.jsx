import { BsCart4 } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import s from './BuyButton.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../../redux/cartSlice/cartOperations.js';
import { toast } from 'react-toastify';

export const BuyButton = ({ productId, isInCart }) => {
  const dispatch = useDispatch();

  const handleBuy = () => {
    dispatch(addProductToCart(productId));
    toast.success('Товар додано до кошику');
  };

  return (
    <button className={clsx(s.btn, { [s.btnIsInCart]: isInCart })} onClick={handleBuy}>
      {isInCart && (
        <span>
          <GiCheckMark className={clsx(s.check, { [s.checkVisible]: isInCart })} />
        </span>
      )}
      <BsCart4 />
    </button>
  );
};
