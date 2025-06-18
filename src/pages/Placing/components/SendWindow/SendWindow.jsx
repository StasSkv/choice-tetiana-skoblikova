import s from './SendWindow.module.css';
import { RiTakeawayLine } from 'react-icons/ri';

export const SendWindow = () => {
  const order = 1131;

  return (
    <div className={s.sendWindow}>
      <label htmlFor=""></label>
      <input type="text" placeholder="Ввести промокод" className={s.promocod} />
      <div className={s.orderWrap}>
        <div className={s.orderLine}>
          <p>Сума замовлення:</p>
          <span className={s.line}></span>
          <span className={s.order}>{order}грн</span>
        </div>

        <div className={s.orderLine}>
          <p>Знижка:</p>
          <span className={s.line}></span>
          <span className={s.order}>0%</span>
        </div>
      </div>

      <div className={s.delivery}>
        <RiTakeawayLine className={s.rover} />
        <p>
          Орієнтовна дата доставки <span>14.07.2025</span>
        </p>
      </div>

      <div className={s.poster}>
        <RiTakeawayLine className={s.posterIcon} />
        <div>
          <p>БЕЗКОШТОВНА доставка </p>
          <span>при замовленні від 499 грн</span>
        </div>
      </div>

<div className={s.submitWrap}>
          <div className={s.orderLine}>
            <p className={s.total}>
              Всього:
            </p>
            <span className={s.line}></span>
            <span className={s.totalOrder}>{order}грн</span>
          </div>
    
          <button className={s.submitBtn} type="submit">
            Оформити замовлення
          </button>
</div>
    </div>
  );
};
