import s from './ProductCard.module.css';
import product from '../../assets/images/product.png';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/cartSlice/cartSlice';
import { BsCart4 } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from '../../redux/favoritesSlice/favoritesSlice.js';
import { makeSelectIsProductFavorite } from '../../redux/favoritesSlice/favoritesSelectors.js';

export const ProductCard = ({ id, price, name, text }) => {
  const dispatch = useDispatch();
  const isLoved = useSelector(makeSelectIsProductFavorite(id));
  const productData = { id, name, price, product };

  const handleClickLove = () => {
    if (isLoved) {
      dispatch(removeProductFromFavorites(id));
    } else {
      dispatch(addProductToFavorites(productData));
    }
  };

  const handleClickBuy = () => {
    dispatch(addProductToCart(productData));
  };

  return (
    <div className={s.productCard}>
      <button className={`${s.myLove} ${isLoved ? s.myLoveActive : ''}`} onClick={handleClickLove}>
        <FaHeart />
      </button>
      <img src={product} alt="product" className={s.productImage} />
      <div className={s.descriptionWrap}>
        <p className={s.name}>{name}</p>
        <div className={s.textAndOptions}>
          <p className={s.text}>{text}</p>
          <div className={s.options}>
            <p className={s.price}>{`${price} грн`}</p>
            <button className={s.btn} onClick={handleClickBuy}>
              <BsCart4 />
            </button>
          </div>
        </div>
      </div>
      <span className={s.colorRound}></span>
    </div>
  );
};
