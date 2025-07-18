import s from './ProductDetails.module.scss';
import clsx from 'clsx';

import { Options } from './components/Options/Options.jsx';
import { InfoSwitcher } from './components/InfoSwitcher/InfoSwitcher.jsx';
import { Main } from './components/Main/Main.jsx';
import { motion } from 'framer-motion';
import { FormReviews } from './components/FormReviews/FormReviews.jsx';
import { GoArrowLeft } from 'react-icons/go';

import {
  selectProductById,
  selectAllProducts,
} from '../../redux/productsSlice/productsSelectors.js';
import { fetchProductById } from '../../redux/productsSlice/productsOperations.js';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MySwiper from '../../components/MySwiper/MySwiper.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const products = useSelector(selectAllProducts);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openModal]);

  const addCloudinaryParams = (url, params) => {
    return url.replace('/upload/', `/upload/${params}/`);
  };

  return (
    product && (
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={clsx(s.modalwrap, openModal && s.modalWrapOpen)}
          onClick={() => setOpenModal(false)}
        >
          <img
            src={addCloudinaryParams(product.imgS, 'q_auto,f_auto,c_fill,g_auto,h_800')}
            alt={product.name}
          />
        </div>
        <>
          <section className={s.ProductDetails}>
            <div className={clsx('container', s.productContainer)}>
              <Main product={product} openModal={setOpenModal} />
              <NavLink to="/products" className={s.goBack}>
                <span>
                  <GoArrowLeft />
                </span>
                Продовжити покупки
              </NavLink>
            </div>
          </section>

          <section className={s.infoSection}>
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

          <section className={s.reviewsSection}>
            <div className={clsx('container', s.productContainer)}>
              <FormReviews product={product} />
            </div>
          </section>

          <section className={s.swiperSection}>
            <div className={clsx('container', s.productContainer, s.mySwiper)}>
              <h2 className={s.swiperTitle}>Також вас може зацікавити</h2>
              {products && <MySwiper products={products} slidesPerView={5} />}
            </div>
          </section>
        </>
      </motion.div>
    )
  );
};

export default ProductDetails;
