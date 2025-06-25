import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RatingProduct } from '../../../../components/RatingProduct/RatingProduct.jsx';
import s from './FormReviews.module.css';
import * as Yup from 'yup';
import { RatingReviews } from '../../../../components/RatingProduct/RatingReviews/RatingReviews.jsx';
import { getFormattedDate } from './formattedDate.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewsById } from '../../../../redux/reviewsSlice/reviewsSelectors.js';
import { addReview } from '../../../../redux/reviewsSlice/reviewsSlice.js';

export const FormReviews = ({ product }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviewsById(product.id));

  const initialValues = {
    id: product.id,
    name: '',
    review: '',
    date: '',
    rating: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Введіть ім'я"),
    review: Yup.string().required('Введіть відгук'),
    rating: Yup.number().min(1, 'Оцініть товар').required('Оцініть товар'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const date = getFormattedDate();
    const newReview = {
      ...values,
      date,
    };
    dispatch(addReview(newReview));
    console.log(reviews);

    resetForm();
  };

  return (
    <div className={s.reviews}>
      <div className={s.leaveRewievs}>
        <h2 className={s.title}>Відгуки про товар</h2>
        <div className={s.listWrap}>
          <ul>
            {reviews?.map(({ id, name, review, date, rating }) => (
              <li key={id} className={s.item}>
                <div>
                  <h3>{name}</h3>
                  <RatingReviews value={rating} />
                  <span className={s.date}>{date}</span>
                </div>
                <p>{review}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.formWrap}>
        <h2 className={s.title}>Залишити відгук</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={s.form}>
              <label className={s.label}>
                Ім'я:
                <Field type="text" name="name" className={s.input} />
                <ErrorMessage name="name" component="div" className={s.error} />
              </label>

              <label className={s.label}>
                Відгук:
                <Field as="textarea" name="review" rows="4" className={s.textarea} />
                <ErrorMessage name="review" component="div" className={s.error} />
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
