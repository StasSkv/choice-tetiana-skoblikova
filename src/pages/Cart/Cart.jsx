import { useDispatch, useSelector } from 'react-redux';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import img from '../../assets/images/product.png';
import s from './Cart.module.css';
import {
  addclearCart,
  addDeleteProduct,
  addMinusQuantity,
  addPlusQuantity,
} from '../../redux/cartSlice/cartSlice.js';
import { toast } from 'react-toastify';

export const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsInCart);

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

  return (
    <div className={s.cart}>
      <h2 className={s.title}>Кошик товарів</h2>
      <div className={s.header}>
        <p className={s.totalProducts}>
          Всього товарів: <span>{products.length}</span>
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
            <li key={product.id} className={s.productItem}>
              <img src={img} alt="" className={s.productImg} />
              <div className={s.description}>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
              </div>
              <div className={s.options}>
                <div className={s.quantity}>
                  <button
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
                  {(product.quantity * product.price).toLocaleString('uk-UA')} <span>грн</span>
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
