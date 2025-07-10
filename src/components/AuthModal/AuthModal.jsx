import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './AuthModal.module.css';
import { TfiClose } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../redux/authSlice/authOperations.js';
import { setLoginModalIsOpen } from '../../redux/authSlice/authSlice.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { selectIsLoading } from '../../redux/authSlice/authSelectors.js';
import { toast } from 'react-toastify';
import { translateErrorMessage } from './translateErrorMessage.js';
import { validationSchema } from './validationSchema.js';
import { formatPhoneNumber } from './formatedPhone.js';
import { getCurrentUser } from '../../redux/authSlice/authOperations.js';

Modal.setAppElement('#root');

export const AuthModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const initialValues = {
    authType: 'register',
    name: '',
    phone: '',
    password: '',
  };

  const handleClose = () => {
    dispatch(setLoginModalIsOpen(false));
  };

  const handleSubmit = async (values) => {
    const userData = {
      name: values.name,
      phone: values.phone,
      password: values.password,
    };
    try {
      if (values.authType === 'register') {
        await dispatch(registerUser(userData)).unwrap();
        toast.success('Ви успішно зареєструвалися та увійшли в аккаунт');
      } else {
        await dispatch(loginUser({ phone: userData.phone, password: userData.password })).unwrap();
        await dispatch(getCurrentUser()).unwrap();
        toast.success('Ви успішно увійшли в аккаунт');
      }
      dispatch(setLoginModalIsOpen(false));
    } catch (err) {
      toast.error(translateErrorMessage(err.message));
      return err;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      shouldFocusAfterRender={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        },
      }}
      className={s.modal}
    >
      <button className={s.closeBtn} onClick={handleClose}>
        <TfiClose />
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={false}
        >
          {({ values }) => (
            <Form className={s.authForm}>
              <div className={s.authType}>
                <Field
                  type="radio"
                  id="register"
                  name="authType"
                  value="register"
                  className={s.authTypeInput}
                />
                <label htmlFor="register">Реєстрація</label>

                <Field
                  type="radio"
                  id="login"
                  name="authType"
                  value="login"
                  className={s.authTypeInput}
                />
                <label htmlFor="login">Вхід</label>
              </div>
              <motion.div layout className={s.authInputs}>
                <AnimatePresence mode="wait">
                  {values.authType === 'register' && (
                    <motion.div
                      key="name-field"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={s.authFormGroup}
                    >
                      <label className={s.authFormLabel} htmlFor="name">
                        Ім'я
                      </label>
                      <Field className={s.authFormInput} id="name" name="name" type="text" />
                      <ErrorMessage name="name" component="span" className={s.error} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={s.authFormGroup}>
                  <label className={s.authFormLabel} htmlFor="phone">
                    Телефон
                  </label>
                  <Field
                    className={s.authFormInput}
                    id="phone"
                    name="phone"
                    type="text"
                    value={formatPhoneNumber(values.phone)}
                  />
                  <ErrorMessage name="phone" component="span" className={s.error} />
                </div>
                <div className={s.authFormGroup}>
                  <label className={s.authFormLabel} htmlFor="password">
                    Пароль
                  </label>
                  <Field
                    className={s.authFormInput}
                    id="password"
                    name="password"
                    type="password"
                  />
                  <ErrorMessage name="password" component="span" className={s.error} />
                </div>
              </motion.div>
              <button type="submit" className={s.authFormButton}>
                {values.authType === 'register' ? 'Зареєструватися' : 'Увійти'}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
