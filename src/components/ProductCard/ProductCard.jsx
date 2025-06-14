import s from './ProductCard.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LikeButton } from '../Buttons/LikeButton/LikeButton.jsx';
import { DeleteButton } from '../Buttons/DeleteButton/DeleteButton.jsx';
import { BuyButton } from '../Buttons/BuyButton/BuyButton.jsx';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import { useState } from 'react';
import { RatingProduct } from '../RatingProduct/RatingProduct.jsx';

export const ProductCard = ({ id, price, quantity, img, name, text, isFavoritesPage = false }) => {
  const productsInCart = useSelector(selectProductsInCart);
  const productsInFavorites = useSelector(selectFavoritesProducts);
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

  const isInCart = productsInCart.some((product) => product && product.id === id);
  const isInFavorite = productsInFavorites.includes(id);

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('.rating')) return;
    navigate(`/product/${id}`);
  };

  return (
    <div className={clsx(s.productCard, isRemoving && s.removing)} onClick={handleCardClick}>
      {isFavoritesPage ? (
        <DeleteButton id={id} onStartRemove={() => setIsRemoving(true)} />
      ) : (
        <LikeButton isLoved={isInFavorite} id={id} />
      )}

      <img src={`/images/${img}`} alt={name} className={s.productImage} />
      <div className={s.descriptionWrap}>
        <p className={s.name}>{name}</p>
        <div className={s.textAndOptions}>
          <div>
            <p className={clsx(s.text, { [s.textIsInCart]: isInCart })}>{text}</p>
            <div className={clsx('rating', s.rating, {[s.ratingIsInCart]:isInCart})}>
              <RatingProduct productId={id} />
            </div>
          </div>
          <div className={s.options}>
            <p className={clsx(s.price, { [s.priceIsInCart]: isInCart })}>{`${price} грн`}</p>
            <BuyButton id={id} quantity={quantity} isInCart={isInCart} />
          </div>
        </div>
      </div>
      <span className={clsx(s.colorRound, isInCart && s.colorRoundIsInCart)}></span>
    </div>
  );
};
