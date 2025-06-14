import { BsCart4 } from 'react-icons/bs';
import { RatingProduct } from '../../../../components/RatingProduct/RatingProduct.jsx';
import { Details } from '../Details/Details.jsx';
import s from './Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addProductToCart } from '../../../../redux/cartSlice/cartSlice.js';
import { selectProductsInCart } from '../../../../redux/cartSlice/cartSelectors.js';
import clsx from 'clsx';
import { GiCheckMark } from 'react-icons/gi';

export const Main = ({ product }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(selectProductsInCart);

  const isInCart = productsInCart.some(({ id }) => id === product.id);

  const handleBuy = () => {
    dispatch(addProductToCart(product.id));
    toast.success('Товар додано до кошику');
  };

  return (
    <div className={s.productHeaderWrap}>
      <div className={s.productImgWrap}>
        <img src={`/images/${product.img}`} alt={product.name} className={s.productImg} />
      </div>
      <div className={s.descriptionWrap}>
        <div className={s.wrap}>
          <h2>{product.name}</h2>
          <p className={s.text}>{product.text}</p>
          <p className={s.howMany}>{product.howMany}</p>
          <div className={s.btnWrap}>
            <p className={s.price}>{product.price} грн</p>
            <button className={s.btnBuy} onClick={handleBuy} disabled={isInCart}>
              {isInCart ? 'В кошику' : 'Придбати'}
              {isInCart && (
                <span>
                  <GiCheckMark className={clsx(s.check, s.checkVisible)} />
                </span>
              )}
              <span>
                <BsCart4 />
              </span>
            </button>
          </div>
          <RatingProduct productId={product.id} />
        </div>
        <div className={s.appointmentWrap}>
          <p className={s.apoint}>
            Призначення: <span>{product.appointment}</span>
          </p>
          {product.detail && <Details info={product.details} />}
        </div>
      </div>
    </div>
  );
};
