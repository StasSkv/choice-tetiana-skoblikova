import { NavLink } from 'react-router-dom';
import s from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
  return (
    <div className={s.burgerMenu}>
      <div className={s.burgerMenuLinks}>
        <NavLink to="/">Головна</NavLink>
        <NavLink to="/team">Команда</NavLink>
        <NavLink to="/products">Каталог</NavLink>
      </div>
    </div>
  );
};
