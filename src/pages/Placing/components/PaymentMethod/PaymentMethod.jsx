import s from './PaymentMethod.module.css';

export const PaymentMethod = ({ formik }) => {
  const options = [
    { id: 'payToCard', label: 'Оплатити зараз' },
    { id: 'overpayment', label: 'Оплата при отриманні' },
  ];

  return (
    <div className={s.wrapper}>
      {options.map(({ id, label }) => (
        <label key={id} className={s.radioLabel} htmlFor={id}>
          <input
            type="radio"
            id={id}
            name="paymentMethod"
            value={id}
            checked={formik.values.paymentMethod === id}
            onChange={formik.handleChange}
            className={s.radioInput}
          />
          <span className={s.customRadio}></span>
          {label}
        </label>
      ))}
    </div>
  );
};
