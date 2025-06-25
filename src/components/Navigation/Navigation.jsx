import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import s from './Navigation.module.css';
import { NavLinkItem } from './NavigationComponents/NavLinkItem/NavLinkItem.jsx';
import { FavoritesLink } from './NavigationComponents/FavoritesLink/FavoritesLink.jsx';
import { CartLink } from './NavigationComponents/CartLink/CartLink.jsx';
import { AccountLink } from './NavigationComponents/AccountLink/AccountLink.jsx';

export const Navigation = () => {
  const productsInCart = useSelector(selectProductsInCart);
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
      <NavLinkItem to="/">Головна</NavLinkItem>
      <NavLinkItem to="/team">Команда</NavLinkItem>
      <NavLinkItem to="/products">Каталог</NavLinkItem>
      <FavoritesLink count={favoriteItems.length} animate={animateFavorites} />
      <AccountLink />
      <CartLink count={productsInCart.length} animate={animateCart} />
    </nav>
  );
};
