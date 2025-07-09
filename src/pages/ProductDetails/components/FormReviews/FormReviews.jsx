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

export const FormReviews = () => {
  const userId = '60f8c2d5a3b2c826d8e8b123';
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviewsByProductId(id));
  }, [id, dispatch]);

  const reviews = useSelector(selectProductReviews);

  const validationSchema = Yup.object({
    userName: Yup.string().required("Введіть ім'я"),
    comment: Yup.string()
      .min(10, 'Розкажіть трошки більше')
      .max(500, 'Занадто багато символів')
      .required('Введіть відгук'),
    rating: Yup.number().min(1, 'Оцініть товар').required('Оцініть товар'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newReview = {
      ...values,
    };
    dispatch(createReview(newReview));
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
      <div className={s.formWrap}>
        <h2 className={s.title}>Залишити відгук</h2>
        <Formik
          initialValues={{
            userId: userId,
            productId: id,
            userName: '',
            comment: '',
            rating: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={s.form}>
              <Field type="hidden" name="userId" />
              <Field type="hidden" name="productId" />
              <label className={s.label}>
                Ім'я:
                <Field type="text" name="userName" className={s.input} />
                <ErrorMessage name="userName" component="div" className={s.error} />
              </label>
              <label className={s.label}>
                Відгук:
                <Field as="textarea" name="comment" rows="4" className={s.textarea} />
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
    </div>
  );
};
