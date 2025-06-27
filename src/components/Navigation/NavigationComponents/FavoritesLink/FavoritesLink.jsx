import { NavLink } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import s from './FavoritesLink.module.css';
import { useSelector } from 'react-redux';
import { selectFavoritesProducts } from '../../../../redux/favoritesSlice/favoritesSelectors.js';

export const FavoritesLink = ({ animate }) => {
  const favoritesProducts = useSelector(selectFavoritesProducts); 
  const countFavorites = favoritesProducts.length;
  
  return (
  <NavLink
    to="/favorites"
    className={({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link)}
  >
    <div className={s.favorites}>
      <CiHeart className={s.favorites} />
        {countFavorites > 0 && (
        <span className={`${s.favoriteCounter} ${s.counterShow} ${animate ? s.bounce : ''}`}>
          {countFavorites}
        </span>
      )}
    </div>
  </NavLink>
);
};
