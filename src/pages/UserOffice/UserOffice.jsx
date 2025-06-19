import { useSelector } from 'react-redux';
import { MySwiper } from '../../components/MySwiper/MySwiper.jsx';
import { Info } from './Info/Info.jsx';
import { Menu } from './Menu/Menu.jsx';
import s from './UserOffice.module.css';
import { motion } from 'framer-motion';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';
import { History } from './History/History.jsx';
import { Reviews } from './Reviews/Reviews.jsx';

export const UserOffice = () => {
  const products = useSelector(selectAllProducts);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`container ${s.container}`}>
        <div className={s.main}>
          <Menu />

          <div className={s.mainWrap}>
            <h2>Вітаємо, Тетяно!</h2>
            <div id="info">
              <Info />
            </div>
          </div>
        </div>
        <div id="history" className={s.history}>
          <h2>Історія замовлень</h2>
          <History />
        </div>
        <div id="reviews" className={s.reviews}>
          <h2>Мої відгуки</h2>
          <Reviews />
        </div>
        <div id="favorites" className={s.favorites}>
          <h2>Улюбленні</h2>
          <MySwiper products={products} slidesPerView={5} />
        </div>
        <div id="viewed" className={s.views}>
          <h2>Нещодавно переглянуті</h2>
          <MySwiper products={products} slidesPerView={5} />
        </div>
      </div>
    </motion.div>
  );
};
