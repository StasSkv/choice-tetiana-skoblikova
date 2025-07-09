import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './AuthModal.module.css';
import { TfiClose } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../redux/authSlice/authOperations.js';
import { setLoginModalIsOpen } from '../../redux/authSlice/authSlice.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { formatPhoneNumber } from './formatedPhone.js';
import { toast } from 'react-toastify';
import { selectIsLoading } from '../../redux/authSlice/authSelectors.js';

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

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Ім’я повинно містити не менше 2 символів')
      .max(100, 'Ім’я повинно містити не більше 100 символів')
      .required('Ім’я є обов’язковим'),
    phone: Yup.string()
      .min(13, 'Телефон повинен містити не менше 13 символів')
      .max(13, 'Телефон повинен містити не більше 13 символів')
      .matches(/^\+380\d{9}$/, 'Телефон повинен бути в форматі +380XXXXXXXXX')
      .required('Телефон є обов’язковим'),
    password: Yup.string()
      .min(6, 'Пароль повинен містити не менше 6 символів')
      .max(50, 'Пароль повинен містити не більше 50 символів')
      .required('Пароль є обов’язковим'),
  });

  const handleClose = () => {
    dispatch(setLoginModalIsOpen(false));
  };


  const handleSubmit = async (values) => {
    const userData = {
      name: values.name,
      phone: values.phone,
      password: values.password,
    };
    if (values.authType === 'register') {
      await dispatch(registerUser(userData));
      if (dispatch(registerUser.fulfilled)) {
        toast.success('Реєстрація успішна');
        dispatch(setLoginModalIsOpen(false));
      }
    } else {
      console.log(userData);
      await dispatch(loginUser(userData));
      if (dispatch(loginUser.fulfilled)) {
        toast.success('Вхід успішний');
        dispatch(setLoginModalIsOpen(false));
      }
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
      {isLoading ? <div>Loading...</div> : <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                <Field className={s.authFormInput} id="password" name="password" type="password" />
                <ErrorMessage name="password" component="span" className={s.error} />
              </div>
            </motion.div>
            <button type="submit" className={s.authFormButton}>
              {values.authType === 'register' ? 'Зареєструватися' : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>}
    </Modal>
  );
};
