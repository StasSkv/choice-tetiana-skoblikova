import { useDispatch, useSelector } from 'react-redux';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import s from './Cart.module.css';
// import {
//   addMinusQuantity,
//   addPlusQuantity,
// } from '../../redux/cartSlice/cartSlice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart, deleteProductFromCart } from '../../redux/cartSlice/cartOperations.js';
// import { addPlusQuantity, addMinusQuantity } from '../../redux/cartSlice/cartSlice.js';

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(selectProductsInCart);
  const cartSum = useSelector(selectProductsInCart);

  const handleClickClearCart = () => {
    dispatch(clearCart());
    toast.warning('Кошик очищенно');
  };

  const handleClickDeleteProduct = (id) => {
    dispatch(deleteProductFromCart(id));

    toast.warning('Товар видалено з кошику');
  };

  const handleClickPlusQuantity = (id) => {
    // dispatch(addPlusQuantity(id));
    console.log('id', id);
  };

  const handleClickMinusQuantity = (id) => {
    // dispatch(addMinusQuantity(id));
    console.log('id', id);
  };

  const handleCardClick = (e, id) => {
    e.preventDefault();
    if (
      e.target.closest('button') ||
      e.target.closest('.rating') ||
      e.target.closest('.deleteBtn')
    ) {
      return;
    }
    navigate(`/products/${id}`);
  };

  return (
    <div className={s.cart}>
      <h2 className={s.title}>Кошик товарів</h2>
      <div className={s.header}>
        <p className={s.totalProducts}>
          Всього позицій: <span>{products.length}</span>
          <span>
            {cartSum.toLocaleString('uk-UA', {
              style: 'currency',
              currency: 'UAH',
            })}
          </span>
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
              key={product._id}
              className={s.productItem}
              onClick={(e) => handleCardClick(e, product.id)}
              role="button"
              tabIndex={0}
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
                    handleClickDeleteProduct(product.productId);
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
