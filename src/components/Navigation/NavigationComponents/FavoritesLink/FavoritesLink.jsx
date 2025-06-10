import { NavLink } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import s from './FavoritesLink.module.css';

export const FavoritesLink = ({ count, animate }) => (
  <NavLink
    to="/favorites"
    className={({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link)}
  >
    <div className={s.favorites}>
      <CiHeart className={s.favorites} />
      {count > 0 && (
        <span className={`${s.favoriteCounter} ${s.counterShow} ${animate ? s.bounce : ''}`}>
          {count}
        </span>
      )}
    </div>
  </NavLink>
);
