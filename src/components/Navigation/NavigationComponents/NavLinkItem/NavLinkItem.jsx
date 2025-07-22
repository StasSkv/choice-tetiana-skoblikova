import s from './NavLinkItem.module.scss';
import { NavLink } from 'react-router-dom';

export const NavLinkItem = ({ to, children }) => {
  const navLinkStyle = ({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link);

  return (
    <NavLink to={to} className={navLinkStyle}>
      {children}
    </NavLink>
  );
};
