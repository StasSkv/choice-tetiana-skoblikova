import { useSelector } from 'react-redux';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';

export const Favorites = () => {
  const favoritesProducts = useSelector(selectFavoritesProducts);

  return (
    <ul>
      {favoritesProducts.map((product) => (
        <li key={product.id}>
          <img src={product.product} alt="" />
          <p>{product.text}</p>
          <p>{product.price}</p>
        </li>
      ))}
    </ul>
  );
};
