import { useDispatch, useSelector } from 'react-redux';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import s from './Cart.module.css';
import {
  addclearCart,
  addDeleteProduct,
  addMinusQuantity,
  addPlusQuantity,
} from '../../redux/cartSlice/cartSlice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allProducts = useSelector(selectAllProducts);
  const productsInCart = useSelector(selectProductsInCart);

  const products = productsInCart
    .map((cartItem) => {
      const product = allProducts.find((p) => p.id === cartItem.id);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(Boolean);

  const handleClickClearCart = () => {
    dispatch(addclearCart());
    toast.warning('Кошик очищенно');
  };

  const handleClickDeleteProduct = (id) => {
    dispatch(addDeleteProduct(id));
    toast.warning('Товар видалено з кошику');
  };

  const handleClickPlusQuantity = (id) => {
    dispatch(addPlusQuantity(id));
  };

  const handleClickMinusQuantity = (id) => {
    dispatch(addMinusQuantity(id));
  };

  const handleCardClick = (e, id) => {
    if (e.target.closest('button')) return;
    navigate(`/product/${id}`);
  };

  return (
    <div className={s.cart}>
      <h2 className={s.title}>Кошик товарів</h2>
      <div className={s.header}>
        <p className={s.totalProducts}>
          Всього позицій: <span>{productsInCart.length}</span>
        </p>
        <button className={s.cleanCart} onClick={handleClickClearCart}>
          <span>
            <MdOutlineDeleteOutline />
          </span>
          Очистити кошик
        </button>
      </div>
      {products.length > 0 ? (
        <ul className={s.productList}>
          {products.map((product) => (
            <li
              key={product.id}
              className={s.productItem}
              onClick={(e) => handleCardClick(e, product.id)}
            >
              <img src={`/images/${product.imgS}`} alt={product.name} className={s.productImg} />
              <div className={s.description}>
                <h3>{product.name}</h3>
                <p>{product.brief}</p>
              </div>
              <div className={s.options}>
                <div className={s.quantity}>
                  <button
                    disabled={product.quantity === 1}
                    className={s.minus}
                    onClick={() => {
                      handleClickMinusQuantity(product.id);
                    }}
                  >
                    <span></span>
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    className={s.plus}
                    onClick={() => {
                      handleClickPlusQuantity(product.id);
                    }}
                  >
                    +
                  </button>
                </div>
                <p className={s.quantityPrice}>
                  {(product.quantity * product.price).toLocaleString('uk-UA', {
                    style: 'currency',
                    currency: 'UAH',
                  })}
                </p>
                <button
                  className={s.deleteBtn}
                  onClick={() => {
                    handleClickDeleteProduct(product.id);
                  }}
                >
                  {<MdOutlineDeleteOutline />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.notProductInCart}>Кошик порожній</p>
      )}
    </div>
  );
};
