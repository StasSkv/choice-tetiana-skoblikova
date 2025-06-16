import s from './userModal.module.css';

export const UserModal = ({ user, onClose }) => {
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={s.avatarWrapper}>
         <div className={s.notAvatar}><span>T</span></div>
        </div>
        <h2 className={s.name}>{user.name}</h2>
        <p className={s.email}>{user.email}</p>
        <p className={s.info}>{user.info}</p>
      </div>
    </div>
  );
};
