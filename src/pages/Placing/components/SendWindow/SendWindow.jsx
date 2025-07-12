import s from './SendWindow.module.css';
import { RiTakeawayLine } from 'react-icons/ri';
import { SubmitBtn } from '../../../../components/Buttons/SubmitBtn/SubmitBtn.jsx';
import { useSelector } from 'react-redux';
import { selectTotalPriceCart } from '../../../../redux/cartSlice/cartSelectors.js';
import { DeliveryDate } from '../DeliveryDate/DeliveryDate.jsx';

export const SendWindow = () => {
  const totalPriceCart = useSelector(selectTotalPriceCart);
  let order = 0;
  if (totalPriceCart) {
    order = totalPriceCart.toLocaleString('uk-UA', {
    style: 'currency',
    currency: 'UAH',
  });
}



  return (
    <div className={s.sendWindow}>
      <input id="promocod" type="text" placeholder="Ввести промокод" className={s.promocod}/>
      <div className={s.orderWrap}>
        <div className={s.orderLine}>
          <p>Сума замовлення:</p>
          <span className={s.line}></span>
          <span className={s.order}>{order}</span>
        </div>

        <div className={s.orderLine}>
          <p>Знижка:</p>
          <span className={s.line}></span>
          <span className={s.order}>0%</span>
        </div>
      </div>

      <div className={s.delivery}>
        <RiTakeawayLine className={s.rover} />
        <DeliveryDate />
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
          <p className={s.total}>Всього:</p>
          <span className={s.line}></span>
          <span className={s.totalOrder}>{order}</span>
        </div>

        <SubmitBtn>Відправити замовлення</SubmitBtn>
      </div>
    </div>
  );
};
