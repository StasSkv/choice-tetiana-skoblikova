import s from './SendWindow.module.css';

export const SendWindow = ({ formik }) => {
  const order = 1131;

  return (
    <div className={s.sendWindow}>
      <label htmlFor=""></label>
      <input type="text" placeholder="Ввести промокод" className={s.promocod} />

      <div className={s.orderLine}>
        <p>Загальна сума замовлення </p><span className={s.line}></span>
        <span className={s.order}>{order}грн</span>
      </div>

      <div className={s.orderLine}>
        <p>Знижка</p>
        <span>– 0 ₴</span>
      </div>

      <div className={s.orderLine}>
        <p>Орієнтовна дата доставки</p>
        <span>з 20 по 22 червня</span>
      </div>

      <div className={s.orderLine}>
        <p>
          <strong>Всього</strong>
        </p>
        <span>
          <strong>{formik.order} ₴</strong>
        </span>
      </div>

      <button className={s.submitBtn} type="submit">
        Відправити
      </button>
    </div>
  );
};
