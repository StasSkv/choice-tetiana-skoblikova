import s from './Products.module.css';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';
import { ProductsList } from '../../components/ProductList/ProductList.jsx';
import { Catalog } from '../../components/Catalog/Catalog.jsx';

export const Products = () => {
  const allProducts = useSelector(selectAllProducts);

  return (
    <section className={s.products}>
      <div className="container">
        <h2 className={s.subtitle}>Каталог товарів</h2>

        <div className={s.mainWrap}>
          <Catalog />
          <ProductsList products={allProducts} isFavoritesPage={false} />
        </div>
      </div>
    </section>
  );
};
