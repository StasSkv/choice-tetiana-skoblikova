import { useSelector } from 'react-redux';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import s from './Favorites.module.css';
import { GoArrowLeft } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { ProductsList } from '../../components/ProductList/ProductList.jsx';

export const Favorites = () => {
  const favoritesProducts = useSelector(selectFavoritesProducts);

  return (
    <section className={s.favorites}>
      <div className="container">
        <h2 className={s.subtitle}>Улюбленні товари</h2>

        {favoritesProducts.length > 0 ? (
          <ProductsList products={favoritesProducts} isFavoritesPage={true} />
        ) : (
          <div className={s.isNotFavorite}>
            <p className={s.isNotFavoriteText}>У вас ще немає улюблених товарів</p>
          </div>
        )}
        <NavLink to="/products" className={s.goBack}>
          <span>
            <GoArrowLeft />
          </span>
          Продовжити покупки
        </NavLink>
      </div>
    </section>
  );
};
