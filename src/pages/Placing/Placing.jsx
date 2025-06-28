import s from './Placing.module.css';
import { motion } from 'framer-motion';
import logo from '../../assets/images/tetiana-logo.png';
import { GoArrowLeft } from 'react-icons/go';

import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { toast } from 'react-toastify';
import { DeliveryCity } from './components/DeliveryCity/DeliveryCity.jsx';
import { Client } from './components/Client/Client.jsx';
import { PaymentMethod } from './components/PaymentMethod/PaymentMethod.jsx';
import { SendWindow } from './components/SendWindow/SendWindow.jsx';

import { clearCartLocal } from '../../redux/cartSlice/cartSlice.js';
import { clearCart } from '../../redux/cartSlice/cartOperations.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsLoggedIn } from '../../redux/authSlice/authSelectors.js';

const Placing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClickBack = () => {
    navigate(-1);
  };

  const initialValues = isLoggedIn
    ? {
        fullName: user.firstName + ' ' + user.lastName,
        email: user.email,
        phone: user.phone,
        city: user.deliveryOption.city,
        deliveryMethod: user.deliveryOption.method,
        paymentMethod: user.paymentOption.method,
        department: user.deliveryOption.department,
      }
    : {
        fullName: '',
        email: '',
        phone: '',
        city: '',
        deliveryMethod: '',
        paymentMethod: '',
        department: '',
      };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required('Введіть ім’я').min(5, 'Ім’я повинно містити не менше 5 символів').max(40, 'Ім’я повинно містити не більше 40 символів'),
      email: Yup.string().email('Невірний email'),
      phone: Yup.string().required('Введіть ім’я').min(10, 'Телефон повинен містити не менше 10 символів').max(13, 'Телефон повинен містити не більше 13 символів'),
      deliveryMethod: Yup.string().oneOf(
        ['Nova_Poshta', 'Ukrposhta', 'Self'],
        'Оберіть спосіб доставки'
      ),
      city: Yup.string().required('Оберіть місто'),
      department: Yup.string().required('Оберіть відділення'),
      paymentMethod: Yup.string().oneOf(['payToCard', 'overpayment'], 'Оберіть спосіб оплати'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log('Форма надіслана:', values);
      toast.success('Замовлення надіслано');
      formik.resetForm();
      dispatch(clearCartLocal());
      dispatch(clearCart());
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

export default Placing;
