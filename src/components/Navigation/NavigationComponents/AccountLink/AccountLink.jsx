import { VscAccount } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';
import s from './AccountLink.module.css';

export const AccountLink = () => (
  <NavLink to="/" className={s.navLinkAccount}>
    <VscAccount className={s.acoount} />
  </NavLink>
);
