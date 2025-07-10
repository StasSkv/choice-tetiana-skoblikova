import { NavLink } from 'react-router-dom';
import s from './UserWindow.module.css';
import { IoExitOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { logoutUser } from '../../redux/authSlice/authOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/authSlice/authSelectors';
import { setLoginModalIsOpen } from '../../redux/authSlice/authSlice';
import { toast } from 'react-toastify';
import { formattedDate } from './formattedDate';

export const UserWindow = ({ onClose }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const navLinkStyle = ({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link);
  const [animationClass, setAnimationClass] = useState(s.modalOpen);

  const handleClose = () => {
    setAnimationClass(s.modalClose);
  };

  useEffect(() => {
    if (animationClass === s.modalClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animationClass, onClose]);

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    toast.warning('Ви успішно вийшли з аккаунту');
    onClose();
  };

  const handleClick = () => {
    onClose();
    dispatch(setLoginModalIsOpen(true));
  };

  return (
    <div className={s.backdrop} onClick={handleClose}>
      <div className={`${s.modal} ${animationClass}`} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={handleClose}>
          сховати <FaArrowRightFromBracket />
        </button>
        {isLoggedIn ? (
          <div className={s.userWindow}>
            <div className={s.avatarWrapper}>
              <div className={s.notAvatar}>
                <span>{user.name?.[0]?.toUpperCase() || 'U'}</span>
              </div>

              <div className={s.userNameWrap}>
                <h2 className={s.name}>{user.name}</h2>
                <h2 className={s.lastName}> {user.lastName} </h2>
              </div>
            </div>
            <div className={s.mainBlock}>
              <NavLink className={navLinkStyle} to="/office">
                Мій кабінет
              </NavLink>
              <NavLink
                className={navLinkStyle}
                to="/favorites"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Улюбленні товари
              </NavLink>
              <NavLink className={navLinkStyle} to="/office">
                Переглянуті товари
              </NavLink>
              <NavLink className={navLinkStyle} to="/office">
                Історія замовлень
              </NavLink>
              <NavLink className={navLinkStyle} to="/placing">
                Оформити замовлення
              </NavLink>

              <button className={s.exitBtn} onClick={handleLogout}>
                <span>
                  <IoExitOutline />
                </span>
                Вийти
              </button>
            </div>

            <p className={s.email}>{user.email}</p>
            <p className={s.info}>Ви з нами з {formattedDate(user.createdAt)}</p>
          </div>
        ) : (
          <div className={s.authWindow}>
            <p className={s.authInfo}>
              Отримуй персональні пропозиції та доступ до додаткових функцій
            </p>
            <button className={s.authBtn} onClick={handleClick}>
              Вхід / Реєстрація
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
