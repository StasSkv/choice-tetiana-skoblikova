import { ProductCard } from '../../components/ProductCard/ProductCard';
import s from './Products.module.css';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';

export const Products = () => {
  const allProducts = useSelector(selectAllProducts);

  return (
    <section className={s.products}>
      <div className="container">
        <h2 className={s.subtitle}>Каталог товарів</h2>
        <ul className={s.productList}>
          {allProducts.map((product) => (
            <li key={product.id} className={s.productCard}>
              <ProductCard
                name={product.name}
                text={product.text}
                price={product.price}
                id={product.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
