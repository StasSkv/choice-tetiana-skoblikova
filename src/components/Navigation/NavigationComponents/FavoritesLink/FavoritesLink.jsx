import { NavLink } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import s from './FavoritesLink.module.css';
import { useSelector } from 'react-redux';
import { selectFavoritesIds } from '../../../../redux/favoritesSlice/favoritesSelectors.js';
import { useState, useEffect } from 'react';

export const FavoritesLink = () => {
  const favoritesIds = useSelector(selectFavoritesIds);
  const countFavorites = favoritesIds.length;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (countFavorites > 0) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [countFavorites]);

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
