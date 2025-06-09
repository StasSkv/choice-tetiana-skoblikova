import s from './UserBar.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';

const UserBar = () => {
  return (
    <div className={s.userBar}>
      <FaUserCircle />
      <p>Tetiana</p>
      <FaAngleDown />
    </div>
  );
};

export default UserBar;
