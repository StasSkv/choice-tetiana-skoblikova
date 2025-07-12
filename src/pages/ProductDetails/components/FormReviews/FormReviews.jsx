import s from './FormReviews.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { RatingReviews } from '../../../../components/RatingProduct/RatingReviews/RatingReviews.jsx';
import { RatingProduct } from '../../../../components/RatingProduct/RatingProduct.jsx';

import { getFormattedDate } from './formattedDate.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProductReviews } from '../../../../redux/reviewsSlice/reviewsSelectors.js';
import {
  createReview,
  fetchReviewsByProductId,
} from '../../../../redux/reviewsSlice/reviewsOperations.js';
import { useEffect } from 'react';
import { selectIsLoggedIn, selectUser } from '../../../../redux/authSlice/authSelectors.js';
import { setLoginModalIsOpen } from '../../../../redux/authSlice/authSlice.js';
import { toast } from 'react-toastify';

export const FormReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const reviews = useSelector(selectProductReviews);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchReviewsByProductId(id));
  }, [id, dispatch]);

  const validationSchema = Yup.object({
    comment: Yup.string()
      .min(10, 'Розкажіть трошки більше')
      .max(500, 'Занадто багато символів')
      .required('Введіть відгук'),
    rating: Yup.number().min(1, 'Оцініть товар').required('Оцініть товар'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const newReview = {
      ...values,
    };
    await dispatch(createReview(newReview));
    toast.success('Дякуємо за ваш відгук!');
    resetForm();
  };

  return (
    <div className={s.reviews}>
      <div className={s.leaveRewievs}>
        <h2 className={s.title}>Відгуки про товар</h2>
        {reviews.length > 0 ? (
          <div className={s.scrollBox}>
            <ul className={s.list}>
              {reviews?.map(({ _id, userName, comment, rating, createdAt }) => (
                <li key={_id} className={s.item}>
                  <div className={s.headerReview}>
                    <h3>{userName}</h3>
                    <span className={s.date}>{getFormattedDate(createdAt)}</span>
                  </div>
                  <div className={s.ratingBlock}>
                    <RatingReviews value={rating} />
                  </div>
                  <p>{comment}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className={s.noReviews}>Якщо вам є що розповісти про цей товар, залиште свій відгук</p>
        )}
      </div>
      {isLoggedIn ? (
        <div className={s.formWrap}>
          <h2 className={s.title}>Залишити відгук</h2>
          <Formik
            initialValues={{
              productId: id,
              userName: user?.name || '',
              comment: '',
              rating: 0,
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className={s.form}>
                <Field type="hidden" name="productId" />
                <label className={s.label}>
                  Ім'я:
                  <Field type="text" name="userName" readOnly className={s.input} />
                  <ErrorMessage name="userName" component="div" className={s.error} />
                </label>
                <label className={s.label}>
                  Відгук:
                  <Field
                    as="textarea"
                    name="comment"
                    rows="4"
                    placeholder="Введіть ваш відгук"
                    className={s.textarea}
                  />
                  <ErrorMessage name="comment" component="div" className={s.error} />
                </label>
                <div className={s.ratingBlock}>
                  <p>Оцініть товар:</p>
                  <RatingProduct
                    value={values.rating}
                    onChange={(val) => setFieldValue('rating', val)}
                  />
                <ErrorMessage name="rating" component="div" className={s.error} />
                </div>
                <button type="submit" className={s.submitBtn}>
                  Надіслати відгук
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className={s.formWrap}>
          <h2 className={s.title}>Залишити відгук</h2>
          <p className={s.noReviews}>Для того щоб залишити відгук, потрібно авторизуватися</p>
          <button
            type="button"
            className={s.loginBtn}
            onClick={() => dispatch(setLoginModalIsOpen(true))}
          >
            Вхід / Реєстрація
          </button>
        </div>
      )}
    </div>
  );
};
