import { useSelector } from 'react-redux';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import s from './Favorites.module.css';
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';
import { GoArrowLeft } from 'react-icons/go';
import { NavLink } from 'react-router-dom';

export const Favorites = () => {
  const favoritesProducts = useSelector(selectFavoritesProducts);
  return (
    <section className={s.favorites}>
      <div className="container">
        <h2 className={s.subtitle}>Улюбленні товари</h2>

        {favoritesProducts.length > 0 ? (
          <ul className={s.favoritesList}>
            {favoritesProducts.map(({ id, name, price, text, quantity }) => (
              <li key={id} className={s.productCard}>
                <ProductCard
                  id={id}
                  name={name}
                  price={price}
                  text={text}
                  isFavoritesPage={true}
                  quantity={quantity}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.isNotFavorite}>
            <p className={s.isNotFavoriteText}>У вас ще немає улюблених товарів</p>
            <NavLink to="/products" className={s.goBack}>
              <span>
                <GoArrowLeft />
              </span>
              Продовжити покупки
            </NavLink>
          </div>
        )}
      </div>
    </section>
  );
};
