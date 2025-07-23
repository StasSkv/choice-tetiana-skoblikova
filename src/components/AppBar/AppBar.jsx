import { Navigation } from '../Navigation/Navigation';
import s from './AppBar.module.scss';
import logo from '../../assets/images/tetiana-logo.png';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu.jsx';
import { useState } from 'react';

export const AppBar = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  return (
    <header className={s.header}>
      <div className={`container ${s.container}`}>
        <div className={s.burgerMenu}>
          <button className={s.burgerButton} onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
            <RxHamburgerMenu className={s.burgerIcon} />
          </button>
        </div>
        <div className={s.logoWrap}>
          <a href="/">
            <img className={s.logoImg} src={logo} alt="logo" />
          </a>
        </div>
        <Navigation />
      </div>
      {isBurgerMenuOpen && <BurgerMenu />}
    </header>
  );
};
