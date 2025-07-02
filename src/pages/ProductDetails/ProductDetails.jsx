import { useSelector } from 'react-redux';
import s from './ProductDetails.module.css';
import clsx from 'clsx';
import { Options } from './components/Options/Options.jsx';
import { InfoSwitcher } from './components/InfoSwitcher/InfoSwitcher.jsx';
import { Main } from './components/Main/Main.jsx';
// import MySwiper from '../../components/MySwiper/MySwiper.jsx';
import { motion } from 'framer-motion';
import { FormReviews } from './components/FormReviews/FormReviews.jsx';
import { selectLoading, selectProductById } from '../../redux/productsSlice/productsSelectors.js';
import { Loader } from '../../components/Loader/Loader.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchReviewsByProductId } from '../../redux/reviewsSlice/reviewsOperations.js';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const product = useSelector(selectProductById());
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (product) {
      dispatch(fetchReviewsByProductId(params.id));
    }
  }, [params.id, dispatch, product]);
 
  if (!isLoading && (!product || Object.keys(product).length === 0)) return <Loader />;
  return (
    product.data && (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
    >
      <>
        <section className={s.ProductDetails}>
          <div className={clsx('container', s.productContainer)}>
            <Main product={product.data} />
          </div>
        </section>

        <section>
          <div className={clsx('container', s.productContainer)}>
            {product.data.description && (
              <InfoSwitcher
                descriptionData={product.data.description}
                advantagesData={product.data.advantages}
                actionsData={product.data.actions}
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
            <FormReviews product={product.data._id} />
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
    )
  );
};

export default ProductDetails;
