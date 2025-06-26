import { useDispatch, useSelector } from 'react-redux';
import { selectProductsInCart } from '../../redux/cartSlice/cartSelectors.js';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import s from './Cart.module.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  clearCart,
  deleteProductFromCart,
  addPlusQuantity,
  addMinusQuantity,
} from '../../redux/cartSlice/cartOperations.js';

import {
  clearCartLocal,
  deleteProductFromCartLocal,
  addMinusQuantityLocal,
  addPlusQuantityLocal,
} from '../../redux/cartSlice/cartSlice.js';

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(selectProductsInCart);

  const handleClickClearCart = () => {
    dispatch(clearCartLocal());
    dispatch(clearCart());
    toast.warning('Кошик очищенно');
  };

  const handleClickDeleteProduct = (productId, price) => {
    dispatch(deleteProductFromCartLocal(productId, price));
    dispatch(deleteProductFromCart(productId));
    toast.warning('Товар видалено з кошику');
  };

  const handlePlusQuantity = (product) => {
    dispatch(addPlusQuantityLocal(product.productId));
    dispatch(addPlusQuantity({ productId: product.productId, quantity: product.quantity + 1 }));
  };

  const handleMinusQuantity = (product) => {
    dispatch(addMinusQuantityLocal(product.productId));
    dispatch(
      addMinusQuantity({
        productId: product.productId,
        quantity: product.quantity - 1,
      })
    );
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
              key={product.productId}
              className={s.productItem}
              onClick={(e) => handleCardClick(e, product.productId)}
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
                      handleMinusQuantity(product);
                    }}
                  >
                    <span></span>
                  </button>
                  <p>{product.quantity}</p>
                  <button className={s.plus} onClick={() => handlePlusQuantity(product)}>
                    +
                  </button>
                </div>
                <p className={s.quantityPrice}>{(product.price * product.quantity).toFixed(2)}</p>
                <button
                  className={s.deleteBtn}
                  onClick={() => {
                    handleClickDeleteProduct(product.productId, product.price);
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
