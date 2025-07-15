import s from './Info.module.css';
import { FaPencil } from 'react-icons/fa6';
import { selectUser } from '../../../redux/authSlice/authSelectors.js';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import clsx from 'clsx';
import * as Yup from 'yup';
import { formatPhoneNumber } from '../../../components/AuthModal/formatedPhone.js';
import { TfiClose } from 'react-icons/tfi';
import { updateUser } from '../../../redux/authSlice/authOperations.js';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export const Info = () => {
  const user = useSelector(selectUser);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();


  const handleSubmit = async (values) => {
    await dispatch(updateUser(values));
    if (dispatch.fulfilled) {
      toast.success('Дані успішно оновлені');
    } else {
      toast.error('Не вдалося оновити дані');
    }
    setOpenModal(false);
  };

  const initialValues = {
    name: user?.name,
    phone: user?.phone,
    email: user?.email || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Ім'я повинно містити мінімум 2 символи")
      .max(100, "Ім'я повинно містити максимум 100 символів")
      .required("Ім'я є обов'язковим"),
    phone: Yup.string()
      .min(10, 'Телефон повинен містити не менше 10 символів')
      .max(20, 'Телефон повинен містити не більше 20 символів')
      .required('Телефон є обов’язковим'),
    email: Yup.string().email('Неправильний формат пошти'),
  });

  return (
    <div className={`container ${s.infoContainer}`}>
      <div className={s.userInfo}>
        <ul>
          <li>
            <span> Ім'я та прізвище:</span>
            <p>{user?.name}</p>
          </li>
          <li>
            <span>Телефон:</span>
            <p>{user?.phone}</p>
          </li>
          <li>
            <span>Пошта:</span>
            <p>{user?.email}</p>
          </li>
          <li>
            <span>Місто доставки:</span>
            <p>{user?.deliveryOptions?.city}</p>
          </li>
          <li>
            <span>Служба доставки:</span>
            <p>{user?.deliveryOptions?.method}</p>
          </li>
          <li>
            <span>Відділення:</span>
            <p>{user?.deliveryOptions?.department}</p>
          </li>
        </ul>
        <button className={s.edit} onClick={() => setOpenModal(true)}>
          <FaPencil />
          Редагувати дані
        </button>
      </div>

      <div className={clsx(s.modalWrap, openModal && s.modalWrapOpen)}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={false}
          onSubmit={handleSubmit}
        >
          {({ values, resetForm }) => (
            <Form className={s.modalForm}>
              <button
                className={s.closeBtn}
                type="button"
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
              >
                <TfiClose />
              </button>
              <div className={s.modalFormGroup}>
                <label htmlFor="name" className={s.modalFormLabel}>
                  Ім'я та прізвище
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ім'я"
                  className={s.modalFormInput}
                />
                <ErrorMessage name="name" component="span" className={s.error} />
              </div>
              <div className={s.modalFormGroup}>
                <label htmlFor="phone" className={s.modalFormLabel}>
                  Телефон
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  value={formatPhoneNumber(values.phone)}
                  placeholder="Телефон"
                  className={s.modalFormInput}
                />
                <ErrorMessage name="phone" component="span" className={s.error} />
              </div>
              <div className={s.modalFormGroup}>
                <label htmlFor="email" className={s.modalFormLabel}>
                  Пошта
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Пошта"
                  className={s.modalFormInput}
                />
                <ErrorMessage name="email" component="span" className={s.error} />
              </div>
              <button type="submit" className={s.modalFormButton}>
                Зберегти
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
