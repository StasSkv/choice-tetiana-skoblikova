import { useSelector } from 'react-redux';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import s from './Favorites.module.css';
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';

export const Favorites = () => {
  const favoritesProducts = useSelector(selectFavoritesProducts);

  return (
    <section className={s.favorites}>
      <div className="container">
        <h2 className={s.subtitle}>Улюбленні товари</h2>

        <ul className={s.favoritesList}>
          {favoritesProducts.map(({ id, name, price, text }) => (
            <li key={id} className={s.productCard}>
              <ProductCard id={id} name={name} price={price} text={text} isFavoritesPage={true} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
