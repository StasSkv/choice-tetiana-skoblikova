import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js/';
import s from './ProductDetails.module.css';
import clsx from 'clsx';
import { Options } from './components/Options/Options.jsx';
import { InfoSwitcher } from './components/InfoSwitcher/InfoSwitcher.jsx';
import { Main } from './components/Main/Main.jsx';
import { MySwiper } from '../../components/MySwiper/MySwiper.jsx';
import { motion } from 'framer-motion';

export const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector(selectAllProducts);
  const product = products.find((product) => product.id === id);

  if (!product) return <p>Товар не знайдено</p>;

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
          <div className={clsx('container', s.productContainer, s.mySwiper)}>
            <h2 className={s.swiperTitle}>Також вас може зацікавити</h2>
            <MySwiper />
          </div>
        </section>
      </>
    </motion.div>
  );
};
