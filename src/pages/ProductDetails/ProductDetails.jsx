import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import s from './ProductDetails.module.css';
import clsx from 'clsx';
import { Options } from './components/Options/Options.jsx';
import { InfoSwitcher } from './components/InfoSwitcher/InfoSwitcher.jsx';
import { Main } from './components/Main/Main.jsx';
// import { MySwiper } from '../../components/MySwiper/MySwiper.jsx';
import { motion } from 'framer-motion';
import { FormReviews } from './components/FormReviews/FormReviews.jsx';
import {
  // selectAllProducts,
  selectProductById,
  selectLoading,
} from '../../redux/productsSlice/productsSelectors.js';
import { fetchProductById } from '../../redux/productsSlice/productsOperations.js';
import { useEffect } from 'react';

export const ProductDetails = () => {
  const dispatch = useDispatch();
  // const products = useSelector(selectAllProducts);
  const isLoading = useSelector(selectLoading);
  const { id } = useParams();

  const product = useSelector(selectProductById(id));

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Завантаження...</p>;

  if (!product || Object.keys(product).length === 0) return <p>Товар не знайдено</p>;

  if (!product.description || !product.advantages || !product.actions) {
    return <p>Завантаження даних продукту...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
    >
      <>
        <section className={s.ProductDetails}>
          <div className={clsx('container', s.productContainer)}>
            <Main product={product} />
          </div>
        </section>

        <section>
          <div className={clsx('container', s.productContainer)}>
            <InfoSwitcher
              descriptionData={product.description}
              advantagesData={product.advantages}
              actionsData={product.actions}
            />
          </div>
        </section>

        <section className={s.optionsSection}>
          <div className={clsx('container', s.productContainer)}>
            <Options info={product.options} />
          </div>
        </section>

        <section>
          <div className={clsx('container', s.productContainer)}>
            <FormReviews product={product.id} />
          </div>
        </section>

        {/* <section>
          <div className={clsx('container', s.productContainer, s.mySwiper)}>
            <h2 className={s.swiperTitle}>Також вас може зацікавити</h2>
            <MySwiper products={products} />
          </div>
        </section> */}
      </>
    </motion.div>
  );
};
