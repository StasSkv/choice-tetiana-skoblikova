import { useDispatch, useSelector } from 'react-redux';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import s from './Favorites.module.css';
import { removeProductFromFavorites } from '../../redux/favoritesSlice/favoritesSlice.js';

export const Favorites = () => {
  const favoritesProducts = useSelector(selectFavoritesProducts);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(removeProductFromFavorites(id));
  };
  return (
    <ul>
      {favoritesProducts.map((product) => (
        <li key={product.id}>
          <img src={product.product} alt="" />
          <p>{product.text}</p>
          <p>{product.price}</p>
          <button className={s.deleteProduct} onClick={() => handleClick(product.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};
