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
import { RatingReviews } from '../RatingProduct/RatingReviews/RatingReviews.jsx';

export const ProductCard = ({ product,  isFavoritesPage = false }) => {
  const productsInCart = useSelector(selectProductsInCart);
  const productsInFavorites = useSelector(selectFavoritesProducts);
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

const isInCart = product ? productsInCart.some((item) => item && item.id === product.id) : false;
  
const isInFavorite = product ? productsInFavorites.includes(product.id) : false;

const avgRating =
  product && product.rating && product.rating.length > 0
    ? Math.round((product.rating.reduce((sum, val) => sum + val, 0) / product.rating.length) * 10) /
      10
    : 0;
  
  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('.rating')) return;
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={clsx(s.productCard, isRemoving && s.removing)} onClick={handleCardClick}>
      {isFavoritesPage ? (
        <DeleteButton id={product.id} onStartRemove={() => setIsRemoving(true)} />
      ) : (
        <LikeButton isLoved={isInFavorite} id={product.id} />
      )}

      <img src={`/images/${product.imgS}`} alt={product.name} className={s.productImage} />
      <div className={s.descriptionWrap}>
        <p className={s.name}>{product.name}</p>
        <div className={s.textAndOptions}>
          <div>
            <p className={clsx(s.brief, { [s.textIsInCart]: isInCart })}>{product.brief}</p>
            <div className={clsx('rating', s.rating, { [s.ratingIsInCart]: isInCart })}>
              <RatingReviews value={avgRating || 0} />
            </div>
          </div>
          <div className={s.options}>
            <p
              className={clsx(s.price, { [s.priceIsInCart]: isInCart })}
            >{`${product.price} грн`}</p>
            <BuyButton id={product.id} quantity={0} isInCart={isInCart} />
          </div>
        </div>
      </div>
      <span className={clsx(s.colorRound, isInCart && s.colorRoundIsInCart)}></span>
    </div>
  );
};
