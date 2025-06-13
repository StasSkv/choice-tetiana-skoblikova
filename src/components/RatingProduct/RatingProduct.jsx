import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from './RatingProduct.module.css';
import { addUpdateProductRating } from '../../redux/productsSlice/productsSlice';
import { useState } from 'react';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';

export const RatingProduct = ({ productId }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const product = allProducts.find((p) => p.id === productId);

  const ratings = product?.rating || [];

  const getAvgRating = (ratings) => {
    if (!ratings.length) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return Number((sum / ratings.length).toFixed(1));
  };

  const avgRating = getAvgRating(ratings);

  const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
    dispatch(addUpdateProductRating({ id: productId, value }));
  };

  const renderStar = (starValue) => {
    const displayRating = hoverRating || avgRating;

    if (displayRating >= starValue) {
      return <FaStar color="gold" size={24} />;
    } else if (displayRating >= starValue - 0.5) {
      return <FaStarHalfAlt color="gold" size={24} />;
    } else {
      return <FaRegStar color="lightgray" size={24} />;
    }
  };

  return (
    <div className={styles.ratingWrapper}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={styles.star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          aria-label={`Оцінити на ${star}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(star);
            }
          }}
        >
          {renderStar(star)}
        </span>
      ))}
      <span className={styles.ratingValue}>{avgRating}</span>
    </div>
  );
};
