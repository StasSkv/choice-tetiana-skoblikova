import s from './Client.module.css';

export const Client = ({ formik }) => {
  return (
    <div className={s.client}>
      <h3>1. Отримувач</h3>

      <label></label>
      <input type="text" name="fullName" value={formik.values.fullName} readOnly />

      <label></label>
      <input type="email" name="email" value={formik.values.email} readOnly />

      <label></label>
      <input type="text" name="phone" value={formik.values.phone} readOnly />
    </div>
  );
};
