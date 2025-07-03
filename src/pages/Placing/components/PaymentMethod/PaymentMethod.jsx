import s from './PaymentMethod.module.css';
import { Field } from 'formik';
import { useId } from 'react';

export const PaymentMethod = () => {
  const paymentMethodCardId = useId();
  const paymentMethodCashId = useId();
  const paymentMethodOverpaymentId = useId();

  return (
    <div className={s.wrapper}>
      <label className={s.radioLabel} htmlFor={paymentMethodCardId}>
        <Field
          type="radio"
          id={paymentMethodCardId}
          name="paymentMethod"
          value="payToCard"
          className={s.radioInput}
        />
        <span className={s.customRadio}></span>
        Оплатити зараз
      </label>
      <label className={s.radioLabel} htmlFor={paymentMethodCashId}>
        <Field
          type="radio"
          id={paymentMethodCashId}
          name="paymentMethod"
          value="overpayment"
          className={s.radioInput}
        />
        <span className={s.customRadio}></span>
        Оплата при отриманні
      </label>
      <label className={s.radioLabel} htmlFor={paymentMethodOverpaymentId}>
        <Field
          type="radio"
          id={paymentMethodOverpaymentId}
          name="paymentMethod"
          value="cash"
          className={s.radioInput}
        />
        <span className={s.customRadio}></span>
        Готівка
      </label>
    </div>
  );
};
