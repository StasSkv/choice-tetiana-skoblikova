import s from './ProductCard.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { LikeButton } from '../Buttons/LikeButton/LikeButton.jsx';
import DeleteButton from '../Buttons/DeleteButton/DeleteButton.jsx';
import { BuyButton } from '../Buttons/BuyButton/BuyButton.jsx';
import { RatingReviews } from '../RatingProduct/RatingReviews/RatingReviews.jsx';

import { selectProductsIds } from '../../redux/cartSlice/cartSelectors.js';
import { selectFavoritesIds } from '../../redux/favoritesSlice/favoritesSelectors.js';

const ProductCard = ({ product, isFavoritesPage = false }) => {
  const favoritesProducts = useSelector(selectFavoritesIds);
  const productsInCart = useSelector(selectProductsIds);  

  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

  const isInFavorite = favoritesProducts.some((item) => item === product._id);
  const isInCart = !!product && productsInCart.some((item) => item?.productId === product._id);

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('.rating') || e.target.closest('.deleteBtn'))
      return;
    navigate(`/products/${product._id}`);
  };

  return (
    <div className={clsx(s.productCard, isRemoving && s.removing)} onClick={handleCardClick}>
      {isFavoritesPage ? (
        <DeleteButton id={product._id} onStartRemove={() => setIsRemoving(true)} />
      ) : (
        favoritesProducts && <LikeButton isLoved={isInFavorite} id={product._id} />
      )}

      <img src={`/images/${product.imgS}`} alt={product.name} className={s.productImage} />
      <div className={s.descriptionWrap}>
        <p className={s.name}>{product.name}</p>
        <div className={s.textAndOptions}>
          <div>
            <p className={clsx(s.brief, { [s.textIsInCart]: isInCart })}>{product.brief}</p>
            <div className={clsx('rating', s.rating, { [s.ratingIsInCart]: isInCart })}>
              <RatingReviews value={product.averageRating} />
            </div>
          </div>
          <div className={s.options}>
            <p
              className={clsx(s.price, { [s.priceIsInCart]: isInCart })}
            >{`${product.price} грн`}</p>
            <BuyButton productId={product._id} quantity={1} isInCart={isInCart} />
          </div>
        </div>
      </div>
      <span className={clsx(s.colorRound, isInCart && s.colorRoundIsInCart)}></span>
    </div>
  );
};

export default ProductCard;
