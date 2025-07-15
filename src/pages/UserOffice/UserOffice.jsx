import { useSelector } from 'react-redux';
import MySwiper from '../../components/MySwiper/MySwiper.jsx';
import { Info } from './Info/Info.jsx';
import { Menu } from './Menu/Menu.jsx';
import s from './UserOffice.module.css';
import { motion } from 'framer-motion';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';
import { History } from './History/History.jsx';
import { Reviews } from './Reviews/Reviews.jsx';
import { selectIsLoading, selectUser } from '../../redux/authSlice/authSelectors.js';
import { useDispatch } from 'react-redux';
import { getUserOrders } from '../../redux/orderSlice/orderOperation.js';
import { useEffect } from 'react';
import { selectUserOrders } from '../../redux/orderSlice/orderSelectors.js';
import { selectUserReviews } from '../../redux/reviewsSlice/reviewsSelectors.js';
import { fetchReviewsByUserId } from '../../redux/reviewsSlice/reviewsOperations.js';

const UserOffice = () => {
  const products = useSelector(selectAllProducts);
  const user = useSelector(selectUser);
  const isLoadingSession = useSelector(selectIsLoading);
  const orders = useSelector(selectUserOrders);
  const reviews = useSelector(selectUserReviews);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoadingSession) {
      dispatch(getUserOrders());
      dispatch(fetchReviewsByUserId());
    }
  }, [dispatch, isLoadingSession]);

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
            <h2>Вітаємо, {user?.name}!</h2>
            <div id="info">
              <Info />
            </div>
          </div>
        </div>
        <div id="history" className={s.history}>
          <h2>Історія замовлень</h2>
          <History orders={orders} />
        </div>
        <div id="reviews" className={s.reviews}>
          <h2>Мої відгуки</h2>
          <Reviews reviews={reviews} />
        </div>
        <div id="favorites" className={s.favorites}>
          <h2>Улюбленні</h2>
          <MySwiper products={products} slidesPerView={5.5} />
        </div>
        <div id="viewed" className={s.views}>
          <h2>Нещодавно переглянуті</h2>
          <MySwiper products={products} slidesPerView={5.5} />
        </div>
      </div>
    </motion.div>
  );
};

export default UserOffice;
