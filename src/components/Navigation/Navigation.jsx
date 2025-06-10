import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { CiHeart } from 'react-icons/ci';
import { VscAccount } from 'react-icons/vsc';
import { BsCart4 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';
import { useEffect, useRef, useState } from 'react';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';

export const Navigation = () => {
  const cartItems = useSelector(selectProductsInCart);
  const favoriteItems = useSelector(selectFavoritesProducts);
  const [animateCart, setAnimateCart] = useState(false);
  const [animateFavorites, setAnimateFavorites] = useState(false);
  const prevCartRef = useRef(cartItems.length);
  const prevFavoritesRef = useRef(favoriteItems.length);
  const totalSum = cartItems.reduce((acc, { price }) => acc + Number(price), 0);

  const navLinkStyle = ({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link);

  useEffect(() => {
    if (cartItems.length !== prevCartRef.current) {
      setAnimateCart(true);
      prevCartRef.current = cartItems.length;
      const timeout = setTimeout(() => setAnimateCart(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [cartItems]);

  useEffect(() => {
    if (favoriteItems.length !== prevFavoritesRef.current) {
      setAnimateFavorites(true);
      prevFavoritesRef.current = favoriteItems.length;
      const timeout = setTimeout(() => setAnimateFavorites(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [favoriteItems]);

  console.log(totalSum);

  return (
    <nav>
      <NavLink to="/" className={navLinkStyle}>
        Головна
      </NavLink>
      <NavLink to="/team" className={navLinkStyle}>
        Команда
      </NavLink>
      <NavLink to="/products" className={navLinkStyle}>
        Каталог
      </NavLink>
      <NavLink to="/favorites" className={navLinkStyle}>
        <CiHeart className={s.favorites} />
        {favoriteItems.length > 0 && (
          <span
            className={`${s.favoriteCounter} ${s.counterShow} ${animateFavorites ? s.bounce : ''}`}
          >
            {favoriteItems.length}
          </span>
        )}
      </NavLink>
      <NavLink to="/profile" className={navLinkStyle}>
        <VscAccount className={s.myAccount} />
      </NavLink>
      <NavLink to="/cart" className={s.navLinkCart}>
   <div className={s.totalSumWrap}>
          {cartItems.length > 0 && (
            <span className={`${s.counter} ${s.counterShow} ${animateCart ? s.bounce : ''}`}>
              {cartItems.length} <span className={s.currency}>x</span>
            </span>
          )}
          <p className={s.totalSum}> {totalSum} <span className={s.currency}>грн</span></p>
   </div>
        <BsCart4 className={ s.cart} />
      </NavLink>
    </nav>
  );
};
