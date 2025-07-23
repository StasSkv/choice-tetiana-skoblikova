import s from './Navigation.module.scss';

import { AccountLink } from './NavigationComponents/AccountLink/AccountLink.jsx';
import { CartLink } from './NavigationComponents/CartLink/CartLink.jsx';
import { FavoritesLink } from './NavigationComponents/FavoritesLink/FavoritesLink.jsx';
import { NavLinkItem } from './NavigationComponents/NavLinkItem/NavLinkItem.jsx';

import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import { selectProductsIds } from '../../redux/cartSlice/cartSelectors.js';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const Navigation = () => {
  const productsInCart = useSelector(selectProductsIds);
  const favoriteItems = useSelector(selectFavoritesProducts);
  const [animateCart, setAnimateCart] = useState(false);
  const [animateFavorites, setAnimateFavorites] = useState(false);

  const prevCartRef = useRef(productsInCart);
  const prevFavoritesRef = useRef(favoriteItems.length);

  useEffect(() => {
    if (productsInCart !== prevCartRef.current) {
      setAnimateCart(true);
      prevCartRef.current = productsInCart;
      const timeout = setTimeout(() => setAnimateCart(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [productsInCart]);

  useEffect(() => {
    if (favoriteItems.length !== prevFavoritesRef.current) {
      setAnimateFavorites(true);
      prevFavoritesRef.current = favoriteItems.length;
      const timeout = setTimeout(() => setAnimateFavorites(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [favoriteItems]);

  return (
    <nav className={s.nav}>
 <div className={s.navLinks}>
        <NavLinkItem to="/">Головна</NavLinkItem>
        <NavLinkItem to="/team">Команда</NavLinkItem>
        <NavLinkItem to="/products">Каталог</NavLinkItem>
 </div>
      <FavoritesLink count={favoriteItems.length} animate={animateFavorites} />
      <AccountLink />
      <CartLink count={productsInCart.length} animate={animateCart} />
    </nav>
  );
};
