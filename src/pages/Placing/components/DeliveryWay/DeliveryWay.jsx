import s from './DeliveryWay.module.css';
import { Field } from 'formik';
import { useId } from 'react';

export const DeliveryWay = () => {
  const novaPoshtaId = useId();
  const ukrposhtaId = useId();
  const selfPickupId = useId();
 
  return (
    <div className={s.deliveryOptions}>
      <h4 className={s.title}>Спосіб доставки</h4>
      <label className={s.radioLabel} htmlFor={novaPoshtaId}>
        <Field
          id={novaPoshtaId}
          type="radio"
          name="delivery"
          value="nova_poshta"
          className={s.radioInput}
        />
        <span className={s.customRadio}></span>
        Нова Пошта
      </label>

      <label className={s.radioLabel} htmlFor={ukrposhtaId}>
        <Field
          id={ukrposhtaId}
          type="radio"
          name="delivery"
          value="ukrposhta"
          className={s.radioInput}
        />
        <span className={s.customRadio}></span>
        Укрпошта
      </label>

      <label className={s.radioLabel} htmlFor={selfPickupId}>
        <Field
          id={selfPickupId}
          type="radio"
          name="delivery"
          value="self_pickup"
          className={s.radioInput}
        />
        <span className={s.customRadio}></span>
        Самовивіз
      </label>
    </div>
  );
};
