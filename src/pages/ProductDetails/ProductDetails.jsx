import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js/';
import s from './ProductDetails.module.css';
import img from '../../assets/images/shower-gel-mood-pleasure.png';
import clsx from 'clsx';
import { Details } from './components/Details/Details.jsx';
import { Options } from './components/Options/Options.jsx';
import { BsCart4 } from 'react-icons/bs';
import { InfoSwitcher } from './components/InfoSwitcher/InfoSwitcher.jsx';

export const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector(selectAllProducts);
  const product = products.find((product) => product.id === id);

  if (!product) return <p>Товар не знайдено</p>;

  return (
    <>
      <section className={s.ProductDetails}>
        <div className={clsx('container', s.productContainer)}>
          <div className={s.productHeaderWrap}>
            <div className={s.productImgWrap}>
              <img src={img} alt="" className={s.productImg} />
            </div>
            <div className={s.descriptionWrap}>
              <div className={s.wrap}>
                <h2>{product.name}</h2>
                <p className={s.text}>{product.text}</p>
                <p className={s.howMany}>{product.howMany}</p>
                <div className={s.btnWrap}>
                  <p className={s.price}>{product.price} грн</p>
                  <button className={s.btnBuy}>
                    Придбати
                    <span>
                      <BsCart4 />
                    </span>
                  </button>
                </div>
              </div>
              <div className={s.appointmentWrap}>
                <p className={s.apoint}>
                  Призначення: <span>{product.appointment}</span>
                </p>
                <Details info={product.details} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={clsx('container', s.productContainer)}>
          <InfoSwitcher
            descriptionData={product.description}
            advantagesData={product.advantages}
            actionsData={product.actions}
          />
        </div>
      </section>

      <section className={s.optionsSection}>
        <div className={clsx('container', s.productContainer)}>
          <Options info={product.options} />
        </div>
      </section>
    </>
  );
};
