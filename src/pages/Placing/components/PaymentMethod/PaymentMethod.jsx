import s from './PaymentMethod.module.css';

export const PaymentMethod = ({ formik }) => {
  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Спосіб оплати</h3>

      <div className={s.option}>
        <input
          type="radio"
          id="payOnDelivery"
          name="paymentMethod"
          value="payOnDelivery"
          checked={formik.values.paymentMethod === 'payOnDelivery'}
          onChange={formik.handleChange}
        />
        <label htmlFor="payOnDelivery">Під час отримання</label>
      </div>

      <div className={s.option}>
        <input
          type="radio"
          id="payNow"
          name="paymentMethod"
          value="payNow"
          checked={formik.values.paymentMethod === 'payNow'}
          onChange={formik.handleChange}
        />
        <label htmlFor="payNow">Оплатити зараз</label>
      </div>

      <div className={s.option}>
        <input
          type="radio"
          id="giftCard"
          name="paymentMethod"
          value="giftCard"
          checked={formik.values.paymentMethod === 'giftCard'}
          onChange={formik.handleChange}
        />
        <label htmlFor="giftCard">Використати подарунковий сертифікат</label>
      </div>
    </div>
  );
};
