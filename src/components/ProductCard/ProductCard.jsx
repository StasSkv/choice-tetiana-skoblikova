import s from './ProductCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/cartSlice/cartSlice';

import { BsCart4 } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import image from '../../assets/images/product.png';
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from '../../redux/favoritesSlice/favoritesSlice.js';
import { makeSelectIsProductFavorite } from '../../redux/favoritesSlice/favoritesSelectors.js';
import { useState } from 'react';
import clsx from 'clsx';
import { makeSelectIsProductInCart } from '../../redux/cartSlice/cartSelectors.js';
import { toast } from 'react-toastify';

export const ProductCard = ({ id, price, name, text, quantity, isFavoritesPage = false }) => {
  const dispatch = useDispatch();
  const isLoved = useSelector(makeSelectIsProductFavorite(id));
  const isInCart = useSelector(makeSelectIsProductInCart(id));
  const [isRemoving, setIsRemoving] = useState(false);
  const productData = { id, name, price, text, quantity };

  const cardClasses = {
    text: clsx(s.text, { [s.textIsInCart]: isInCart }),
    price: clsx(s.price, { [s.priceIsInCart]: isInCart }),
    btn: clsx(s.btn, { [s.btnIsInCart]: isInCart }),
    check: clsx(s.check, { [s.checkVisible]: isInCart }),
  };

  const handleClickLove = () => {
    if (isLoved) {
      dispatch(removeProductFromFavorites(id));
      toast.warning('Товар видалено з улюблених');
    } else {
      dispatch(addProductToFavorites(productData));
      toast.success('Товар додано до улюблених');
    }
  };

  const handleClickBuy = () => {
    dispatch(addProductToCart(productData));
    toast.success('Товар додано до кошику');
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeProductFromFavorites(id));
    }, 300);
    toast.warning('Товар видалено з улюблених');
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
          <p className={cardClasses.text}>{text}</p>
          <div className={s.options}>
            <p className={cardClasses.price}>{`${price} грн`}</p>
            <button className={cardClasses.btn} onClick={handleClickBuy}>
              {isInCart && (
                <span>
                  <GiCheckMark className={cardClasses.check} />
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
