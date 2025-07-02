import { useSelector } from 'react-redux';
import { selectFavoritesIds, selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import s from './Favorites.module.css';
import { GoArrowLeft } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import ProductsList from '../../components/ProductList/ProductList.jsx';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { fetchProductsInFavorites } from '../../redux/favoritesSlice/favoritesOperations.js';
import { fetchFavoritesFromLocal } from '../../redux/favoritesSlice/favoritesOperations.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/authSelectors.js';

const Favorites = () => {
  const favoritesIds = useSelector(selectFavoritesIds);
  const favoritesProducts = useSelector(selectFavoritesProducts);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const onPageChange = (page) => {
    console.log(page);
  };

  useEffect(() => {
    if (favoritesIds && isLoggedIn) {
      dispatch(fetchProductsInFavorites());
    } else if (favoritesIds && !isLoggedIn) {
      dispatch(fetchFavoritesFromLocal());
    }
  }, [dispatch, isLoggedIn, favoritesIds]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <>
        <section className={s.favorites}>
          <div className={clsx('container', s.productContainer, s.mySwiper)}>
            <h2 className={s.subtitle}>Улюблені товари</h2>

            {favoritesProducts.length > 0 ? (
              <div className={s.list}>
                <ProductsList
                  products={favoritesProducts}
                  isFavoritesPage={true}
                  onPageChange={onPageChange}
                />
              </div>
            ) : (
              <div className={s.isNotFavorite}>
                <p className={s.isNotFavoriteText}>У вас ще немає улюблених товарів</p>
              </div>
            )}
            <NavLink to="/products" className={s.goBack}>
              <span>
                <GoArrowLeft />
              </span>
              Продовжити покупки
            </NavLink>
          </div>
        </section>

        {/* {allProducts.length > 0 && (
          <section>
            <div className={clsx('container', s.productContainer, s.mySwiper)}>
              <h2 className={s.swiperTitle}>Також вас може зацікавити</h2>
              <MySwiper products={allProducts} slidesPerView={4.4} />
            </div>
          </section>
        )} */}
      </>
    </motion.div>
  );
};

export default Favorites;
