import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js/';
import s from './ProductDetails.module.css';
import clsx from 'clsx';
import { Details } from './components/Details/Details.jsx';
import { Options } from './components/Options/Options.jsx';
import { BsCart4 } from 'react-icons/bs';
import { InfoSwitcher } from './components/InfoSwitcher/InfoSwitcher.jsx';
import { RatingProduct } from '../../components/RatingProduct/RatingProduct.jsx';
import { Main } from './components/Main/Main.jsx';

export const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector(selectAllProducts);
  const product = products.find((product) => product.id === id);

  if (!product) return <p>Товар не знайдено</p>;

  return (
    <>
      <section className={s.ProductDetails}>
        <div className={clsx('container', s.productContainer)}>
          <Main product={product} />
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
