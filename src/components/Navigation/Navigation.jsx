import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';
import { useEffect, useRef, useState } from 'react';

export const Navigation = () => {
  const counter = useSelector(selectProductsInCart);
  const [animate, setAnimate] = useState(false);
  const prevCountRef = useRef(counter.length);

  const navLinkStyle = ({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link);

  useEffect(() => {
    if (counter.length !== prevCountRef.current) {
      setAnimate(true);
      prevCountRef.current = counter.length;

      const timeout = setTimeout(() => setAnimate(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [counter]);

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
        Збережені товари
      </NavLink>
      <NavLink to="/cart" className={navLinkStyle}>
        Кошик
        {counter.length > 0 && (
          <span className={`${s.counter} ${s.counterShow} ${animate ? s.bounce : ''}`}>
            {counter.length}
          </span>
        )}
      </NavLink>
    </nav>
  );
};
