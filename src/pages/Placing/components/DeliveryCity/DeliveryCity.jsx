import { useState } from 'react';
import { DeliveryWay } from '../DeliveryWay/DeliveryWay.jsx';
import s from './DeliveryCity.module.css';

const popularCities = ['Київ', 'Харків', 'Одеса', 'Львів', 'Дніпро'];

export const DeliveryCity = ({ formik }) => {
  const [isRecipient, setIsRecipient] = useState(false);

  const handleRecipientChange = (e) => {
    setIsRecipient(e.target.value !== 'self');
  };

  return (
    <div className={s.deliveryCityWrap}>
      <div className={s.recipient}>
        <label className={s.radioLabel}>
          <input
            type="radio"
            name="recipient"
            value="self"
            defaultChecked
            className={s.radioInput}
            onChange={handleRecipientChange}
          />
          <span className={s.customRadio}></span>Я отримувач замовлення
        </label>

        <label className={s.radioLabel}>
          <input
            type="radio"
            name="recipient"
            value="other"
            className={s.radioInput}
            onChange={handleRecipientChange}
          />
          <span className={s.customRadio}></span>
          Інший отримувач
        </label>
      </div>
      <div className={s.deliveryWayWrap}>
        <DeliveryWay formik={formik} />
        {isRecipient && (
          <div className={isRecipient ? s.userInfo : s.userInfoHidden}>
            <label htmlFor="fullName" className={s.label}>
              Ім'я <span className={s.required}>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Введіть ваше ім'я..."
              className={s.input}
            />
            <label htmlFor="phone" className={s.label}>
              Телефон <span className={s.required}>*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Введіть ваш телефон..."
              className={s.input}
            />
          </div>
        )}
      </div>
      <div className={s.inputWrap}>
        <label htmlFor="city" className={s.label}>
          Місто <span className={s.required}>*</span>
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className={s.input}
          value={formik.values.city}
          onChange={(e) => {
            formik.setFieldValue('city', e.target.value);
          }}
          placeholder="Введіть місто..."
          autoComplete="address-level2"
        />
        {formik.touched.city && formik.errors.city && (
          <p className={s.error}>{formik.errors.city}</p>
        )}
      </div>

      <div className={s.popularCities}>
        <ul className={s.cityList}>
          {popularCities.map((city) => (
            <li key={city}>
              <button
                type="button"
                onClick={() => {
                  formik.setFieldValue('city', city);
                }}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.inputWrap}>
        <label htmlFor="cityDetails" className={s.label}>
          Відділення <span className={s.required}>*</span>
        </label>
        <input
          type="text"
          id="cityDetails"
          name="cityDetails"
          className={s.input}
          value={formik.values.cityDetails}
          onChange={(e) => formik.setFieldValue('cityDetails', e.target.value)}
          placeholder="Введіть номер відділення..."
          autoComplete="off"
        />
        {formik.touched.cityDetails && formik.errors.cityDetails && (
          <p className={s.error}>{formik.errors.cityDetails}</p>
        )}
      </div>
    </div>
  );
};
