import { useSelector } from 'react-redux';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';

export const Cart = () => {
  const addedProducts = useSelector(selectProductsInCart);

  return (
    <ul>
      {addedProducts.map((product) => (
        <li key={product.id}>
          <img src={product.product} alt="" />
          <p>{product.text}</p>
          <p>{product.price}</p>
        </li>
      ))}
    </ul>

    
  );
};
