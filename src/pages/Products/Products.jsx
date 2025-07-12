import s from './Products.module.css';
import ProductsList from '../../components/ProductList/ProductList.jsx';
import { Catalog } from '../../components/Catalog/Catalog.jsx';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllProducts,
  selectPaginationData,
  selectFilters,
} from '../../redux/productsSlice/productsSelectors.js';
import { useEffect } from 'react';
import { fetchProducts } from '../../redux/productsSlice/productsOperations.js';
import { useSearchParams } from 'react-router-dom';
// import { setFilters } from '../../redux/productsSlice/productsSlice.js';

const Products = () => {
  const allProducts = useSelector(selectAllProducts);
  const paginationData = useSelector(selectPaginationData);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams.entries());
  //   if (Object.keys(params).length > 0) {
  //     const parsed = {
  //       page: Number(params.page) || 1,
  //       perPage: Number(params.perPage) || 20,
  //       sortBy: params.sortBy || '_id',
  //       sortOrder: params.sortOrder || 'asc',
  //       category: params.category || 'all',
  //     };
  //     dispatch(setFilters(parsed));
  //     dispatch(fetchProducts({ filters: parsed }));
  //   } else {
  //     setSearchParams(filters);
  //     dispatch(fetchProducts({ filters }));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    setSearchParams(filters);
    dispatch(fetchProducts({ filters }));
  }, [dispatch, setSearchParams, searchParams, filters]);

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
            {allProducts && <ProductsList products={allProducts} pagination={paginationData} />}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Products;
