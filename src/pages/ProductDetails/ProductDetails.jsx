import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js/';
import s from './ProductDetails.module.css';
import img from '../../assets/images/product.png';
import clsx from 'clsx';
import { Details } from './components/Details/Details.jsx';
import { Description } from './components/Description/Description.jsx';
import { Advantages } from './components/Advantages/Advantages.jsx';
import { Actions } from './components/Actions/Actions.jsx';
import { Options } from './components/Options/Options.jsx';

export const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector(selectAllProducts);
  const product = products.find((product) => product.id === id);

  if (!product) return <p>Товар не знайдено</p>;

  return (
    <section className={s.ProductDetails}>
      <div className={clsx('container', s.productContainer)}>
        <div className={s.productHeaderWrap}>
          <div className={s.productImgWrap}>
            <img src={img} alt="" className={s.productImg} />
          </div>
          <ul className={s.descriptionWrap}>
            <li>
              <h2>{product.name}</h2>
            </li>
            <li>
              <p>{product.text}</p>
            </li>
            <li>
              <p>{product.howMany}</p>
            </li>
            <li>
              <p>{product.price} грн</p>
            </li>
            <li>
              <p>
                Призначення: <span>{product.appointment}</span>
              </p>
            </li>
            <li>
              <Details info={product.details} />
            </li>
          </ul>
        </div>
        <Description info={product.description} />
        <Advantages info={product.advantages} />
        <Actions info={product.actions} />
        <Options info={ product.options} />
      </div>
    </section>
  );
};
