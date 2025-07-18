import s from './Placing.module.css';
import { motion } from 'framer-motion';
import logo from '../../assets/images/tetiana-logo.png';
import { GoArrowLeft } from 'react-icons/go';

import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { DeliveryCity } from './components/DeliveryCity/DeliveryCity.jsx';
import { Client } from './components/Client/Client.jsx';
import { PaymentMethod } from './components/PaymentMethod/PaymentMethod.jsx';
import { SendWindow } from './components/SendWindow/SendWindow.jsx';

import { clearCartLocal } from '../../redux/cartSlice/cartSlice.js';
import { validationSchema } from './validationSchema.js';
import { selectProductsIds } from '../../redux/cartSlice/cartSelectors.js';
import { createOrder, createOrderNotAuthorized } from '../../redux/orderSlice/orderOperation.js';
import { formatPhoneNumber } from './formatedPhone.js';
import { toast } from 'react-toastify';
import { selectIsLoggedIn } from '../../redux/authSlice/authSelectors.js';
import { selectUser } from '../../redux/authSlice/authSelectors.js';
import { clearCart } from '../../redux/cartSlice/cartOperations.js';

const Placing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const productsIds = useSelector(selectProductsIds);
  const user = useSelector(selectUser);

  const handleClickBack = () => {
    navigate(-1);
  };

  let initialValues;
  if (isLoggedIn) {
    initialValues = {
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      recipient: 'self',
      recipientName: '',
      recipientPhone: '',
      delivery: user?.deliveryOption?.method || 'nova_poshta',
      city: user?.deliveryOption?.city || '',
      department: user?.deliveryOption?.department || '',
      paymentMethod: user?.paymentOption?.method || 'overpayment',
    };
  } else {
    initialValues = {
      name: '',
      phone: '',
      email: '',
      recipient: 'self',
      recipientName: '',
      recipientPhone: '',
      delivery: 'nova_poshta',
      city: '',
      department: '',
      paymentMethod: 'overpayment',
    };
  }

  const handleSubmit = async (values, actions) => {
    const orderData = {
      name: values.name,
      phone: formatPhoneNumber(values.phone),
      paymentMethod: values.paymentMethod,
      paymentStatus: 'pending',
      products: productsIds,
      status: 'pending',
      recipient: {
        fullName: values.recipient === 'other' ? values.recipientName : values.name,
        phone:
          values.recipient === 'other'
            ? formatPhoneNumber(values.recipientPhone)
            : formatPhoneNumber(values.phone),
        city: values.city,
        deliveryMethod: values.delivery,
        department: values.department,
      },
    };
    if (values.email === '') {
      delete orderData.email;
    }
    try {
      if (isLoggedIn) {
        await dispatch(createOrder(orderData)).unwrap();
        dispatch(clearCart());
      } else {
        await dispatch(createOrderNotAuthorized(orderData)).unwrap();
        dispatch(clearCartLocal());
      }
      actions.resetForm();
      navigate('/', { state: { showModal: true } });
    } catch (error) {
      toast.error('Сталася помилка при створенні замовлення');
      return error;
    }
  };

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
            <Link to="/">
              <img className={s.logoImg} src={logo} alt="logo" />
            </Link>
          </div>
          <div className={s.contacts}>
            <p>095-383-54-92</p>
            <a href="mailto:stas000123@gmail.com">Написати мені</a>
          </div>
        </div>
      </header>

      <section className={s.main}>
        <div className={`container ${s.mainContainer}`}>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            className={s.form}
          >
            <Form className={s.form}>
              <div className={s.formInfoWrap}>
                <h2>Оформлення замовлення</h2>
                <Client />
                <h3>2. Доставка</h3>
                <div className={s.delivery}>
                  <DeliveryCity />
                </div>
                <h3>3. Спосіб оплати</h3>
                <PaymentMethod />
              </div>
              <div className={s.sendWindow}>
                <SendWindow />
              </div>
            </Form>
          </Formik>
        </div>
      </section>
    </motion.div>
  );
};

export default Placing;
