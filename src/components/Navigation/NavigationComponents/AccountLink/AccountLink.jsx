import { VscAccount } from 'react-icons/vsc';
import s from './AccountLink.module.css';
import { useState } from 'react';
import { UserWindow } from '../../../UserWindow/UserWindow.jsx';


export const AccountLink = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (showModal) return;
    setShowModal(true);
  };

  return (
    <div className={s.modalWrap}>
      <button className={s.userBtn} onClick={handleClick}>
        <VscAccount className={s.acoount} />
      </button>
      {showModal && (
        <UserWindow
          user={{
            avatar: 'https://i.pravatar.cc/150?img=3',
            name: 'Тетяна',
            lastName: 'Скоблікова',
            email: 'tetyana@example.com',
            info: 'Постійний клієнт з 2023 року',
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
