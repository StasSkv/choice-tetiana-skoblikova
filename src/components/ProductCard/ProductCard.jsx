import s from './ProductCard.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { makeSelectIsProductFavorite } from '../../redux/favoritesSlice/favoritesSelectors';
import { makeSelectIsProductInCart } from '../../redux/cartSlice/cartSelectors.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { LikeButton } from '../Buttons/LikeButton/LikeButton.jsx';
import { DeleteButton } from '../Buttons/DeleteButton/DeleteButton.jsx';
import { BuyButton } from '../Buttons/BuyButton/BuyButton.jsx';

export const ProductCard = ({ id, price, img, name, text, quantity, isFavoritesPage = false }) => {
  const isLoved = useSelector(makeSelectIsProductFavorite(id));
  const isInCart = useSelector(makeSelectIsProductInCart(id));
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

  const productData = { id, name, img, price, text, quantity };

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/product/${id}`);
  };

  return (
    <div className={clsx(s.productCard, isRemoving && s.removing)} onClick={handleCardClick}>
      {isFavoritesPage ? (
        <DeleteButton id={id} onStartRemove={() => setIsRemoving(true)} />
      ) : (
        <LikeButton isLoved={isLoved} productData={productData} />
      )}

      <img src={`/images/${img}`} alt={name} className={s.productImage} />
      <div className={s.descriptionWrap}>
        <p className={s.name}>{name}</p>
        <div className={s.textAndOptions}>
          <p className={clsx(s.text, { [s.textIsInCart]: isInCart })}>{text}</p>
          <div className={s.options}>
            <p className={clsx(s.price, { [s.priceIsInCart]: isInCart })}>{`${price} грн`}</p>
            <BuyButton productData={productData} isInCart={isInCart} />
          </div>
        </div>
      </div>
      <span className={clsx(s.colorRound, isInCart && s.colorRoundIsInCart)}></span>
    </div>
  );
};
