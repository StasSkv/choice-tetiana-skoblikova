import s from './Products.module.css';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';
import { ProductsList } from '../../components/ProductList/ProductList.jsx';
import { Catalog } from '../../components/Catalog/Catalog.jsx';
import { motion } from 'framer-motion';

export const Products = () => {
  const allProducts = useSelector(selectAllProducts);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <section className={s.products}>
        <div className="container">
          <h2 className={s.subtitle}>Каталог товарів</h2>

          <div className={s.mainWrap}>
            <Catalog />
            <ProductsList products={allProducts} isFavoritesPage={false} />
          </div>
        </div>
      </section>
    </motion.div>
  );
};
