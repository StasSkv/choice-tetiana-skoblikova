import { NavLink } from 'react-router-dom';
import s from './UserWindow.module.css';
import { IoExitOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

export const UserWindow = ({ user, onClose }) => {
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

  return (
    <div className={s.backdrop} onClick={handleClose}>
      <div className={`${s.modal} ${animationClass}`} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={handleClose}>
          сховати <FaArrowRightFromBracket />
        </button>
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

          <button className={s.exitBtn} onClick={onClose}>
            <span>
              <IoExitOutline />
            </span>
            Вийти
          </button>
        </div>

        <p className={s.email}>{user.email}</p>
        <p className={s.info}>{user.info}</p>
      </div>
    </div>
  );
};
