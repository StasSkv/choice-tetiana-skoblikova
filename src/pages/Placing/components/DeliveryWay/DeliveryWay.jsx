import s from './DeliveryWay.module.css';

export const DeliveryWay = ({ formik }) => {
  return (
    <div className={s.deliveryOptions}>
      <h4 className={s.title}>Спосіб доставки</h4>
      {['Nova_Poshta', 'Ukrposhta', 'Self'].map((method) => (
        <label key={method} className={s.radioLabel} htmlFor={`delivery-${method}`}>
          <input
            type="radio"
            name="deliveryMethod"
            value={method}
            checked={formik.values.deliveryMethod === method}
            onChange={() => formik.setFieldValue('deliveryMethod', method)}
            id={`delivery-${method}`}
            className={s.radioInput}
          />
          <span className={s.customRadio}></span>
          {method === 'Nova_Poshta' && 'Нова Пошта'}
          {method === 'Ukrposhta' && 'Укрпошта'}
          {method === 'Self' && 'Самовивіз'}
        </label>
      ))}
    </div>
  );
};
