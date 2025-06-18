import s from './DeliveryCity.module.css';
import Select from 'react-select';

const cityOptions = [
  { value: 'Київ', label: 'Київ' },
  { value: 'Харків', label: 'Харків' },
  { value: 'Одеса', label: 'Одеса' },
  { value: 'Львів', label: 'Львів' },
  { value: 'Глухів', label: 'Глухів' },
  { value: 'Суми', label: 'Суми' },
  { value: 'Макарів', label: 'Макарів' },
  { value: 'Некрасове', label: 'Некрасове' },
];

const popularCities = ['Київ', 'Харків', 'Одеса', 'Львів', 'Дніпро'];

const departmentOptions = [
  { value: 'Відділення №1', label: 'Відділення №1 (вул. Шевченка, 12)' },
  { value: 'Відділення №2', label: 'Відділення №2 (пр. Перемоги, 5)' },
  { value: 'Поштомат №3', label: 'Поштомат №3 (ТРЦ "SkyMall")' },
];

export const DeliveryCity = ({ formik }) => {
  return (
    <div className={s.deliveryCity}>
      <span>
        <input type="checkbox" defaultChecked />Я отримувач замовлення
      </span>
      <h3>2. Доставка</h3>

      <label htmlFor="city">Місто</label>
      <Select
        id="city"
        name="city"
        options={cityOptions}
        value={cityOptions.find((option) => option.value === formik.values.city)}
        onChange={(option) => {
          formik.setFieldValue('city', option.value);
          formik.setFieldValue('department', '');
        }}
        onBlur={() => formik.setFieldTouched('city', true)}
        placeholder="Оберіть місто..."
      />
      {formik.touched.city && formik.errors.city && (
        <div className={s.error}>{formik.errors.city}</div>
      )}

      <div className={s.popularCities}>
        <ul className={s.cityList}>
          {popularCities.map((city) => (
            <li key={city}>
              <button type="button" onClick={() => formik.setFieldValue('city', city)}>
                {city}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <label htmlFor="department">Відділення</label>
      <Select
        id="department"
        name="department"
        options={departmentOptions}
        value={departmentOptions.find((option) => option.value === formik.values.department)}
        onChange={(option) => formik.setFieldValue('department', option.value)}
        onBlur={() => formik.setFieldTouched('department', true)}
        placeholder="Оберіть відділення..."
        isDisabled={!formik.values.city}
      />
      {formik.touched.department && formik.errors.department && (
        <div className={s.error}>{formik.errors.department}</div>
      )}
    </div>
  );
};
