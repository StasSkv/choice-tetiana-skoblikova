import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import s from './RatingReviews.module.css';

export const RatingReviews = ({ value = 0, size = 24 }) => {
  const renderStar = (index) => {
    if (value >= index + 1) {
      return <FaStar color="gold" size={size} />;
    } else if (value >= index + 0.5) {
      return <FaStarHalfAlt color="gold" size={size} />;
    } else {
      return <FaRegStar color="lightgray" size={size} />;
    }
  };

  return (
    <div className={s.starsWrapper}>
      {[0, 1, 2, 3, 4].map((index) => (
        <span key={index} className={s.star}>
          {renderStar(index)}
        </span>
      ))}
      <span className={s.value}>{value}</span>
    </div>
  );
};
