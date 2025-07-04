import s from './Home.module.css';
import tetiana from '../../assets/images/tetiana.jpeg';
import { motion } from 'framer-motion';
import CustomModal from '../../components/CustomModal/CustomModal.jsx';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.state?.showModal) {
      setShowModal(true);
      const closeTimer = setTimeout(() => {
        setShowModal(false);
        navigate(location.pathname, { replace: true });
      }, 2000);
      return () => clearTimeout(closeTimer);
    }
  }, [location.state, location.pathname, navigate]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
    >
      <>
        <section className={s.hero}>
          <div className={`container ${s.container}`}>
            <div className={s.hello}>
              <h2>
                <span>Вітаю</span>, мене звати Тетяна Скоблікова!
              </h2>
              <p>Якщо ви буде в мене замовляти багато продукції - то я куплю собі бібіку!</p>
            </div>
            <img src={tetiana} alt="" className={s.tetiana} />
          </div>
        </section>

        <section className={s.aboutMe}>
          <div className={`container ${s.container}`}></div>
        </section>

        <CustomModal
          isCart={false}
          isOpen={showModal}
          onClose={handleClose}
          overlayClassName={clsx(s.overlay, s.overlayActive)}
          contentClassName={clsx(s.customModalContent, s.contentActive)}
        >
          <div className={s.customModalContent}>
            <h2>Замовлення успішно відправлено</h2>
            <p>Ми зв'яжемося з вами найближчим часом</p>
            <p>Дякуємо за довіру!</p>
          </div>
        </CustomModal>
      </>
    </motion.div>
  );
};

export default Home;
