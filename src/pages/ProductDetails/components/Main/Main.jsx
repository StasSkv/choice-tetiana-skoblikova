import { BsCart4 } from 'react-icons/bs';
import { RatingProduct } from '../../../../components/RatingProduct/RatingProduct.jsx';
import { Details } from '../Details/Details.jsx';
import s from './Main.module.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addProductToCart } from '../../../../redux/cartSlice/cartSlice.js';

export const Main = ({ product }) => {
  const dispatch = useDispatch();

  const handleBuy = () => {
    dispatch(addProductToCart(product.id));
    toast.success('Товар додано до кошику');
  };

  return (
    <div className={s.productHeaderWrap}>
      <div className={s.productImgWrap}>
        <img src={`/images/${product.img}`} alt={product.name} className={s.productImg} />
      </div>
      <div className={s.descriptionWrap}>
        <div className={s.wrap}>
          <h2>{product.name}</h2>
          <p className={s.text}>{product.text}</p>
          <p className={s.howMany}>{product.howMany}</p>
          <div className={s.btnWrap}>
            <p className={s.price}>{product.price} грн</p>
            <button className={s.btnBuy} onClick={handleBuy}>
              Придбати
              <span>
                <BsCart4 />
              </span>
            </button>
          </div>
          <RatingProduct productId={product.id} />
        </div>
        <div className={s.appointmentWrap}>
          <p className={s.apoint}>
            Призначення: <span>{product.appointment}</span>
          </p>
          {product.detail && <Details info={product.details} />}
        </div>
      </div>
    </div>
  );
};
