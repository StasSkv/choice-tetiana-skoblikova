import s from './Products.module.css';
import ProductsList from '../../components/ProductList/ProductList.jsx';
import { Catalog } from '../../components/Catalog/Catalog.jsx';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllProducts,
  selectPaginationData,
} from '../../redux/productsSlice/productsSelectors.js';
import { useEffect } from 'react';
import { fetchProducts } from '../../redux/productsSlice/productsOperations.js';

const Products = () => {
  const allProducts = useSelector(selectAllProducts);
  const paginationData = useSelector(selectPaginationData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, perPage: 20 }));
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(fetchProducts({ page, perPage: 20 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <section className={s.products}>
        <div className="container">
          <h2 className={s.subtitle}>Каталог товарів</h2>
          <div className={s.mainWrap}>
            <Catalog />
            <ProductsList
              products={allProducts}
              pagination={paginationData}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Products;
