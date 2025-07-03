import { useId } from 'react';
import { DeliveryWay } from '../DeliveryWay/DeliveryWay.jsx';
import s from './DeliveryCity.module.css';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { Recipient } from '../Recipient/Recipient.jsx';

// const popularCities = ['Київ', 'Харків', 'Одеса', 'Львів', 'Дніпро'];

export const DeliveryCity = () => {
  const cityFieldId = useId();
  const cityDetailsFieldId = useId();
  const recipientSelfFieldId = useId();
  const recipientOtherFieldId = useId();

  const { values } = useFormikContext();

  return (
    <div className={s.deliveryCityWrap}>
      <div className={s.recipient}>
        <label className={s.radioLabel} htmlFor={recipientSelfFieldId}>
          <Field
            id={recipientSelfFieldId}
            type="radio"
            name="recipient"
            value="self"
            className={s.radioInput}
          />
          <span className={s.customRadio}></span>Я отримувач замовлення
        </label>

        <label className={s.radioLabel} htmlFor={recipientOtherFieldId}>
          <Field
            id={recipientOtherFieldId}
            type="radio"
            name="recipient"
            value="other"
            className={s.radioInput}
          />
          <span className={s.customRadio}></span>
          Інший отримувач
        </label>
      </div>

      <div className={s.deliveryWayWrap}>
        {values.recipient === 'other' && <Recipient />}
        <DeliveryWay />
      </div>
      <div className={s.inputWrap}>
        <label htmlFor={cityFieldId} className={s.label}>
          Місто <span className={s.required}>*</span>
          <ErrorMessage name="city" component="span" className={s.error} />
        </label>
        <Field
          type="text"
          id={cityFieldId}
          name="city"
          className={s.input}
          placeholder="Введіть місто..."
        />
      </div>
      <div className={s.popularCities}></div>
      <div className={s.inputWrap}>
        <label htmlFor={cityDetailsFieldId} className={s.label}>
          Відділення <span className={s.required}>*</span>
          <ErrorMessage name="department" component="span" className={s.error} />
        </label>
        <Field
          type="text"
          id={cityDetailsFieldId}
          name="department"
          className={s.input}
          placeholder="Введіть номер відділення..."
        />
      </div>
    </div>
  );
};
