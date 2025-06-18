import s from './Placing.module.css';
import { motion } from 'framer-motion';
import logo from '../../assets/images/tetiana-logo.png';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Client } from './components/Client/Client.jsx';
import { DeliveryCity } from './components/DeliveryCity/DeliveryCity.jsx';
import { DeliveryWay } from './components/DeliveryWay/DeliveryWay.jsx';
import { PaymentMethod } from './components/PaymentMethod/PaymentMethod.jsx';
import { SendWindow } from './components/SendWindow/SendWindow.jsx';

export const Placing = () => {
  const navigate = useNavigate();

  const user = {
    fullName: 'Тетяна Скоблікова',
    email: 'stas000123@gmail.com',
    phone: '095-383-54-92',
  };
  const handleClickBack = () => {
    navigate(-1);
  };

  const formik = useFormik({
    initialValues: {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      city: 'Kiyv',
      order: 2223,
      deliveryMethod: 'novaPoshta',
      paymentMethod: 'payOnDelivery',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Введіть ім’я'),
      email: Yup.string().email('Невірний email').required('Email обов’язковий'),
      phone: Yup.string().required('Введіть ім’я'),
      city: Yup.string().required('Оберіть місто'),
      paymentMethod: Yup.string().required('Оберіть спосіб оплати'),
    }),
    onSubmit: (values) => {
      console.log('Форма надіслана:', values);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
    >
      <header className={s.header}>
        <div className={`container ${s.container}`}>
          <div className={s.goBack}>
            <button onClick={handleClickBack}>
              <GoArrowLeft /> Назад
            </button>
          </div>
          <div className={s.logoWrap}>
            <a href="/">
              <img className={s.logoImg} src={logo} alt="logo" />
            </a>
          </div>
          <div className={s.contacts}>
            <p>095-383-54-92</p>
            <a href="mailto:stas000123@gmail.com">Написати мені</a>
          </div>
        </div>
      </header>

      <section className={s.main}>
        <div className={`container ${s.mainContainer}`}>
          <form onSubmit={formik.handleSubmit} className={s.form}>
            <div className={s.formInfoWrap}>
              <h2>Оформлення замовлення</h2>
              <Client formik={formik} />
              <h3>2. Доставка</h3>
              <div className={s.delivery}>
                <DeliveryCity formik={formik} />
              </div>
               <h3>3. Спосіб оплати</h3>
              <PaymentMethod formik={formik} />
            </div>

            <div className={s.sendWindow}>
              <SendWindow formik={formik} />
            </div>
          </form>
        </div>
      </section>
    </motion.div>
  );
};
