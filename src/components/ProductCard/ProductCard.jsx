import s from './ProductCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/cartSlice/cartSlice';
import { BsCart4 } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from '../../redux/favoritesSlice/favoritesSlice.js';
import { makeSelectIsProductFavorite } from '../../redux/favoritesSlice/favoritesSelectors.js';
import image from '../../assets/images/product.png';
import { useState } from 'react';
import clsx from 'clsx';
import { makeSelectIsProductInCart } from '../../redux/cartSlice/cartSelectors.js';

export const ProductCard = ({ id, price, name, text, quantity, isFavoritesPage = false }) => {
  const dispatch = useDispatch();
  const isLoved = useSelector(makeSelectIsProductFavorite(id));
  const isInCart = useSelector(makeSelectIsProductInCart(id));
  const [isRemoving, setIsRemoving] = useState(false);
  const productData = { id, name, price, text, quantity };  

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

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeProductFromFavorites(id));
    }, 300);
  };

  return (
    <div className={clsx(s.productCard, isRemoving && s.removing)}>
      {isFavoritesPage ? (
        <button className={s.deleteBtn} onClick={handleRemove}>
          <MdDelete />
        </button>
      ) : (
        <button
          className={`${s.myLove} ${isLoved ? s.myLoveActive : ''}`}
          onClick={handleClickLove}
        >
          <FaHeart />
        </button>
      )}
      <img src={image} alt={name} className={s.productImage} />
      <div className={s.descriptionWrap}>
        <p className={s.name}>{name}</p>
        <div className={s.textAndOptions}>
          <p className={clsx(s.text, isInCart && s.textIsInCart)}>{text}</p>
          <div className={s.options}>
            <p className={clsx(s.price, isInCart && s.priceIsInCart)}>{`${price} грн`}</p>
            <button className={clsx(s.btn, isInCart && s.btnIsInCart)} onClick={handleClickBuy}>
              {isInCart && (
                <span>
                  <GiCheckMark className={clsx(s.check, isInCart && s.checkVisible)} />
                </span>
              )}
              <BsCart4 />
            </button>
          </div>
        </div>
      </div>

      <span className={clsx(s.colorRound, isInCart && s.colorRoundIsInCart)}></span>
    </div>
  );
};
