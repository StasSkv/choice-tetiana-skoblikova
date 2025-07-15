import { useDispatch, useSelector } from 'react-redux';
import { selectCartProducts } from '../../redux/cartSlice/cartSelectors.js';
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
import { useState } from 'react';

export const Cart = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [isRemovingProduct, setIsRemovingProduct] = useState(null);
  const products = useSelector(selectCartProducts);

  const handleClickClearCart = async() => {
    dispatch(clearCartLocal());
    dispatch(clearCart());
    toast.warning('Кошик очищенно');
  };

  const handleClickDeleteProduct = async (productId) => {
    setIsRemovingProduct(productId);
    dispatch(deleteProductFromCartLocal(productId));
    await dispatch(deleteProductFromCart(productId));
    toast.warning('Товар видалено з кошику');
    setIsRemovingProduct(null);
  };

  const handlePlusQuantity = async (product) => {
    setUpdatingProductId(product.productId);
    dispatch(addPlusQuantityLocal(product.productId));
    await dispatch(
      addPlusQuantity({ productId: product.productId, quantity: product.quantity + 1 })
    );
    setUpdatingProductId(null);
  };

  const handleMinusQuantity = async (product) => {
    setUpdatingProductId(product.productId);
    dispatch(addMinusQuantityLocal(product.productId));
    await dispatch(
      addMinusQuantity({
        productId: product.productId,
        quantity: product.quantity - 1,
      })
    );
    setUpdatingProductId(null);
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
    if (e.target.productId !== id) {
      navigate(`/products/${id}`);
      onClose();
    } else {
      onClose();
    }
  };

  const addCloudinaryParams = (url, params) => {
    return url.replace('/upload/', `/upload/${params}/`);
  };

  return (
    <div className={s.cart}>
      <h2 className={s.title}>Кошик товарів</h2>
      <div className={s.header}>
        <p className={s.totalProducts}>
          Всього позицій: <span>{products.length}</span>
        </p>
        {products.length > 0 && (
          <button className={s.cleanCart} onClick={handleClickClearCart}>
            <span>
              <MdOutlineDeleteOutline />
            </span>
            Очистити кошик
          </button>
        )}
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
              <div className={s.productImageWrap}>
                <img
                  src={addCloudinaryParams(product.imgS, 'q_auto,f_auto,c_fill,g_auto,h_80')}
                  alt={product.name}
                  className={s.productImg}
                />
              </div>
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
                  {updatingProductId === product.productId ? (
                    <div className={s.spinner}></div>
                  ) : (
                    <p>{product.quantity}</p>
                  )}

                  <button className={s.plus} onClick={() => handlePlusQuantity(product)}>
                    +
                  </button>
                </div>
                <p className={s.quantityPrice}>{(product.price * product.quantity).toFixed(2)}</p>
                <button
                  className={s.deleteBtn}
                  onClick={() => {
                    handleClickDeleteProduct(product.productId);
                  }}
                >
                  {isRemovingProduct === product.productId ? (
                    <div className={s.spinner}></div>
                  ) : (
                    <MdOutlineDeleteOutline />
                  )}
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
