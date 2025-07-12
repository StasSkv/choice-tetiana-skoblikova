import s from './Info.module.css';
import { FaPencil } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import { selectUser } from '../../../redux/authSlice/authSelectors.js';
import { useSelector } from 'react-redux';

export const Info = () => {
  const user = useSelector(selectUser);

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
