import s from './Info.module.css';
import { FaPencil } from 'react-icons/fa6';
import { selectUser } from '../../../redux/authSlice/authSelectors.js';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import clsx from 'clsx';
import { formatPhoneNumber } from '../../../components/AuthModal/formatedPhone.js';
import { TfiClose } from 'react-icons/tfi';
import { updateUser } from '../../../redux/authSlice/authOperations.js';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validationSchema } from './validationSchema.js';
import { removeEmptyStrings } from './removeEmptyStrings.js';

export const Info = () => {
  const user = useSelector(selectUser);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const data = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      dateOfBirth: values.dateOfBirth,
      deliveryOption: {
        city: values.deliveryOptionCity,
        method: values.deliveryOptionMethod,
        department: values.deliveryOptionDepartment,
      },
    };

    const cleanedData = removeEmptyStrings(data);
    const result = await dispatch(updateUser(cleanedData));

    if (updateUser.fulfilled.match(result)) {
      toast.success('Дані успішно оновлені');
      setOpenModal(false);
    } else {
      toast.error('Не вдалося оновити дані');
    }
  };

  const initialValues = {
    name: user?.name,
    phone: user?.phone,
    email: user?.email || '',
    dateOfBirth: user?.dateOfBirth || '',
    deliveryOptionCity: user?.deliveryOption?.city || '',
    deliveryOptionMethod: user?.deliveryOption?.method || '',
    deliveryOptionDepartment: user?.deliveryOption?.department || '',
  };

  return !user ? null : (
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
            <span>Дата народження:</span>
            <p>{user?.dateOfBirth || 'Не вказано'}</p>
          </li>
          <li>
            <span>E-mail:</span>
            <p>{user?.email || 'Не вказано'}</p>
          </li>
          <li>
            <span>Місто доставки:</span>
            <p>{user?.deliveryOption?.city || 'Не вказано'}</p>
          </li>
          <li>
            <span>Служба доставки:</span>
            <p>{user?.deliveryOption?.method || 'Не вказано'}</p>
          </li>
          <li>
            <span>Відділення:</span>
            <p>{user?.deliveryOption?.department || 'Не вказано'}</p>
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
          enableReinitialize={true}
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
                  placeholder="Ім'я та прізвище"
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
                  Дата народження
                </label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="Дата народження"
                  className={s.modalFormInput}
                />
                <ErrorMessage name="dateOfBirth" component="span" className={s.error} />
              </div>
              <div className={s.modalFormGroup}>
                <label htmlFor="email" className={s.modalFormLabel}>
                  E-mail
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Електронна пошта"
                  className={s.modalFormInput}
                />
                <ErrorMessage name="email" component="span" className={s.error} />
              </div>
              <div className={s.modalFormGroup}>
                <label htmlFor="deliveryOptionCity" className={s.modalFormLabel}>
                  Місто
                </label>
                <Field
                  type="text"
                  id="deliveryOptionCity"
                  name="deliveryOptionCity"
                  placeholder="Місто"
                  className={s.modalFormInput}
                />
                <ErrorMessage name="deliveryOptionCity" component="span" className={s.error} />
              </div>

              <div className={s.modalFormGroup}>
                <label htmlFor="deliveryOptionMethod" className={s.modalFormLabel}>
                  Спосіб доставки
                </label>
                <Field
                  as="select"
                  id="deliveryOptionMethod"
                  name="deliveryOptionMethod"
                  className={s.modalFormInput}
                >
                  <option value="">Не вказано</option>
                  <option value="nova_poshta">Нова Пошта</option>
                  <option value="ukrposhta">Укрпошта</option>
                  <option value="self_pickup">Самовивіз</option>
                </Field>
                <ErrorMessage name="deliveryOptionMethod" component="span" className={s.error} />
              </div>
              <div className={s.modalFormGroup}>
                <label htmlFor="deliveryOptionDepartment" className={s.modalFormLabel}>
                  Відділення
                </label>
                <Field
                  type="text"
                  id="deliveryOptionDepartment"
                  name="deliveryOptionDepartment"
                  placeholder="Відділення"
                  className={s.modalFormInput}
                />
                <ErrorMessage
                  name="deliveryOptionDepartment"
                  component="span"
                  className={s.error}
                />
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
