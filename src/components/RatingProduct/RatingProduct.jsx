import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import s from './RatingProduct.module.css';

export const RatingProduct = ({ value = 0, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || value;

  const renderStar = (starValue) => {
    if (displayRating >= starValue) {
      return <FaStar color="gold" size={24} />;
    } else if (displayRating >= starValue - 0.5) {
      return <FaStarHalfAlt color="gold" size={24} />;
    } else {
      return <FaRegStar color="lightgray" size={24} />;
    }
  };

  return (
    <div className={s.ratingWrapper}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={s.star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          role="button"
          tabIndex={0}
          aria-label={`Оцінити на ${star}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onChange(star);
            }
          }}
        >
          {renderStar(star)}
        </span>
      ))}
      <span className={s.value}>{displayRating}</span>
    </div>
  );
};
