import { useSelector } from 'react-redux';
import { selectFavoritesProducts } from '../../redux/favoritesSlice/favoritesSelectors.js';
import s from './Favorites.module.css';
import { GoArrowLeft } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { ProductsList } from '../../components/ProductList/ProductList.jsx';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';
import clsx from 'clsx';
import { MySwiper } from '../../components/MySwiper/MySwiper.jsx';
import { motion } from 'framer-motion';

export const Favorites = () => {
  const allProducts = useSelector(selectAllProducts);
  const productInFavorites = useSelector(selectFavoritesProducts);

  const favoritesProducts = allProducts.filter((product) =>
    productInFavorites.includes(product.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
    >
      <>
        <section className={s.favorites}>
          <div className={clsx('container', s.productContainer, s.mySwiper)}>
            <h2 className={s.subtitle}>Улюблені товари</h2>

            {favoritesProducts.length > 0 ? (
              <div className={s.list}>
                <ProductsList products={favoritesProducts} isFavoritesPage={true} />
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

        <section>
          <div className={clsx('container', s.productContainer, s.mySwiper)}>
            <h2 className={s.swiperTitle}>Також вас може зацікавити</h2>
            <MySwiper products={allProducts} slidesPerView={4.4} />
          </div>
        </section>
      </>
    </motion.div>
  );
};
