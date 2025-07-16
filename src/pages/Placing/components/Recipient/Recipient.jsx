import { Field, ErrorMessage } from 'formik';
import s from './Recipient.module.css';
import { useId } from 'react';

export const Recipient = () => {
  const recipientNameFieldId = useId();
  const recipientPhoneFieldId = useId();

    return (
      <div className={s.userInfo}>
     <div className={s.inputWrap}>
          <label htmlFor={recipientNameFieldId} className={s.label}>
            Ім'я отримувача <span className={s.required}>*</span>
            <ErrorMessage name="recipientName" component="span" className={s.error} />
          </label>
          <Field
            id={recipientNameFieldId}
            type="text"
            name="recipientName"
            placeholder="Введіть ім'я та прізвище..."
            className={s.input}
          />
     </div>
     <div className={s.inputWrap}>
        <label htmlFor={recipientPhoneFieldId} className={s.label}>
          Телефон отримувача <span className={s.required}>*</span>
          <ErrorMessage name="recipientPhone" component="span" className={s.error} />
        </label>
        <Field
          id={recipientPhoneFieldId}
          type="text"
          name="recipientPhone"
          placeholder="Введіть номер телефону..."
          className={s.input}
        />
      </div>
    </div>
  );
};