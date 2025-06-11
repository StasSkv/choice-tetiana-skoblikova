import { ProductCard } from '../ProductCard/ProductCard.jsx';
import s from './ProductList.module.css';

export const ProductsList = ({ products, isFavoritesPage = false }) => {
  return (
    <ul className={s.productList}>
      {products.map((product) => (
        <li key={product.id} className={s.productCard}>
          <ProductCard {...product} isFavoritesPage={isFavoritesPage} />
        </li>
      ))}
    </ul>
  );
};
