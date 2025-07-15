import s from './History.module.css';
import { Link } from 'react-router-dom';

export const History = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <p className={s.empty}>У вас ще немає замовлень.</p>;
  }
  return (
    <div className={s.history}>
      <ul className={s.historyList}>
        {orders.map((order) => (
          <li key={order._id} className={s.historyItem}>
            <div className={s.historyItemHeader}>
              <h3 className={s.orderTitle}>Замовлення №{order.orderNumber}</h3>
              <p className={s.orderDate}>
                {new Date(order.createdAt).toLocaleString('uk-UA', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <ul className={s.productList}>
              {order.products.map((product) => (
                <li key={product._id} className={s.productItem}>
                  <Link to={`/products/${product.productId}`} className={s.productLink}>
                    <span className={s.productName}>{product.name}</span>
                    <span className={s.productQuantity}>× {product.quantity}</span>
                    <span className={s.productPrice}>{product.price} грн</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={s.total}>
              <span>Загальна сума:</span>
              <span className={s.totalPrice}>{order.totalPrice} грн</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
