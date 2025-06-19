import s from './Info.module.css';
import { FaPencil } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';

export const Info = () => {
  return (
    <div className={`container ${s.infoContainer}`}>
      <div className={s.userInfo}>
     
        <ul>
          <li>
            <span> Ім'я та прізвище:</span>
            <p>Скоблікова Тетяна</p>
          </li>

          <li>
            <span>Телефон:</span>
            <p>095-383-54-92</p>
          </li>
          <li>
            <span>Пошта:</span>
            <p>stas000123@gmail.com</p>
          </li>
        </ul>

        <button className={s.edit}>
          <FaPencil />
          Редагувати дані
        </button>
      </div>

      <div className={s.userAdress}>
        <button className={s.userAdressBtn}>
          <span className={s.img}>
            <FaPlus />
          </span>
          Додати нову адресу
        </button>
      </div>
    </div>
  );
};
