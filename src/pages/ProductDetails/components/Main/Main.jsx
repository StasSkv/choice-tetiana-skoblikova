import s from './Main.module.css';
import clsx from 'clsx';
import { BsCart4 } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Details } from '../Details/Details.jsx';
import { toast } from 'react-toastify';
import { RatingReviews } from '../../../../components/RatingProduct/RatingReviews/RatingReviews.jsx';

import { fetchReviewsByProductId } from '../../../../redux/reviewsSlice/reviewsOperations.js';
import { addProductToCartLocal } from '../../../../redux/cartSlice/cartSlice.js';
import { addProductToCart } from '../../../../redux/cartSlice/cartOperations.js';
import { selectProductsIds } from '../../../../redux/cartSlice/cartSelectors.js';

export const Main = ({ product }) => {
  const dispatch = useDispatch();
  const productsIds = useSelector(selectProductsIds);
  const isInCart = !!product && productsIds.some((item) => item?.productId === product._id);

  useEffect(() => {
    if (product && product._id && product.ratingsCount === 0) {
      dispatch(fetchReviewsByProductId(product._id));
    }
  }, [dispatch, product._id]);

  const handleBuy = () => {
    dispatch(addProductToCartLocal({ productId: product._id, quantity: 1 }));
    dispatch(addProductToCart(product._id));
    toast.success('Товар додано до кошику');
  };

  return (
    <div className={s.productHeaderWrap}>
      <div className={s.productImgWrap}>
        <img src={`/images/${product.imgL}`} alt={product.name} className={s.productImg} />
      </div>
      <div className={s.descriptionWrap}>
        <div className={s.wrap}>
          <h2>{product.name}</h2>
          <p className={s.text}>{product.brief}</p>
          <p className={s.howMany}>{product.volume}</p>
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
          <RatingReviews value={product.averageRating || 0} />
          <p className={s.reviewsCount}>Відгуків: {product.ratingsCount}</p>
        </div>
        <div className={s.appointmentWrap}>
          <p className={s.apoint}>
            Призначення: <span>{product.appointment}</span>
          </p>
          {product.details ? <Details info={product.details} /> : null}
        </div>
      </div>
    </div>
  );
};
