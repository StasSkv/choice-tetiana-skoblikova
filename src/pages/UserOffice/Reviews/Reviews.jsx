import s from './Reviews.module.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className={s.empty}>Ви ще не залишали відгуків</p>;
  }

  return (
    <div className={s.reviews}>
      <ul className={s.reviewList}>
        {reviews.map((review) => (
          <li key={review._id} className={s.reviewItem}>
            <div className={s.reviewHeader}>
              <h3 className={s.reviewName}>{review.userName}</h3>
              <p className={s.reviewDate}>
                {new Date(review.createdAt).toLocaleString('uk-UA', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <Link to={`/products/${review.productId}`} className={s.reviewLink}>
              Перейти до товару
            </Link>

            <div className={s.rating}>
              {Array.from({ length: 5 }).map((_, i) =>
                i < review.rating ? (
                  <FaStar key={i} color="#ffc107" />
                ) : (
                  <FaRegStar key={i} color="#ccc" />
                )
              )}
            </div>

            <p className={s.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
