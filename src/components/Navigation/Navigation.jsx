import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { selectProductsIds } from '../../redux/cartSlice/cartSelectors.js';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import s from './Navigation.module.css';
import { NavLinkItem } from './NavigationComponents/NavLinkItem/NavLinkItem.jsx';
import { FavoritesLink } from './NavigationComponents/FavoritesLink/FavoritesLink.jsx';
import { CartLink } from './NavigationComponents/CartLink/CartLink.jsx';
import { AccountLink } from './NavigationComponents/AccountLink/AccountLink.jsx';
import { selectIsLoggedIn } from '../../redux/authSlice/authSelectors.js';
import { setLoginModalIsOpen } from '../../redux/authSlice/authSlice.js';

export const Navigation = () => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(selectProductsIds);
  const favoriteItems = useSelector(selectFavoritesProducts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
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

  const handleClick = () => {
    dispatch(setLoginModalIsOpen(true));
  };

  return (
    <nav className={s.nav}>
      <NavLinkItem to="/">Головна</NavLinkItem>
      <NavLinkItem to="/team">Команда</NavLinkItem>
      <NavLinkItem to="/products">Каталог</NavLinkItem>
      <FavoritesLink count={favoriteItems.length} animate={animateFavorites} />
      {isLoggedIn ? <AccountLink /> : <button onClick={handleClick}>Вхід/Реєстрація</button>}
      <CartLink count={productsInCart.length} animate={animateCart} />
    </nav>
  );
};
