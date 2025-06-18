import s from "./DeliveryWay.module.css"


export const DeliveryWay = ({ formik }) => {
    return (
      <div className={s.deliveryOptions}>
        <h3>Як доставити?</h3>

        <label>
          <input
            type="radio"
            name="deliveryMethod"
            value="novaPoshta"
            checked={formik.values.deliveryMethod === 'novaPoshta'}
            onChange={formik.handleChange}
          />
          Нова Пошта
        </label>

        <label>
          <input
            type="radio"
            name="deliveryMethod"
            value="ukrPoshta"
            checked={formik.values.deliveryMethod === 'ukrPoshta'}
            onChange={formik.handleChange}
          />
          Укрпошта
        </label>

        <label>
          <input
            type="radio"
            name="deliveryMethod"
            value="pickup"
            checked={formik.values.deliveryMethod === 'pickup'}
            onChange={formik.handleChange}
          />
          Самовивіз
        </label>
      </div>
    );
}