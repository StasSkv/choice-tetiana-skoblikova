import s from './ProductDetails.module.css';
import clsx from 'clsx';

import { Options } from './components/Options/Options.jsx';
import { InfoSwitcher } from './components/InfoSwitcher/InfoSwitcher.jsx';
import { Main } from './components/Main/Main.jsx';
import { motion } from 'framer-motion';
import { FormReviews } from './components/FormReviews/FormReviews.jsx';

import { selectProductById } from '../../redux/productsSlice/productsSelectors.js';
import { fetchProductById } from '../../redux/productsSlice/productsOperations.js';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// import MySwiper from '../../components/MySwiper/MySwiper.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(id));

  useEffect(() => {
    if (!product || product.id !== id) {
      dispatch(fetchProductById(id));
    }
  }, [id, product, dispatch]);

  return product ? (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
    >
      <>
        <section className={s.ProductDetails}>
          <div className={clsx('container', s.productContainer)}>
            <Main product={product} />
          </div>
        </section>

        <section>
          <div className={clsx('container', s.productContainer)}>
            {product.description && (
              <InfoSwitcher
                descriptionData={product.description}
                advantagesData={product.advantages}
                actionsData={product.actions}
              />
            )}
          </div>
        </section>

        <section className={s.optionsSection}>
          <div className={clsx('container', s.productContainer)}>
            <Options info={product.options} />
          </div>
        </section>

        <section>
          <div className={clsx('container', s.productContainer)}>
            <FormReviews product={product._id} />
          </div>
        </section>

        <section>
          <div className={clsx('container', s.productContainer, s.mySwiper)}>
            <h2 className={s.swiperTitle}>Також вас може зацікавити</h2>
            {/* {product && <MySwiper products={product} />} */}
          </div>
        </section>
      </>
    </motion.div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProductDetails;
