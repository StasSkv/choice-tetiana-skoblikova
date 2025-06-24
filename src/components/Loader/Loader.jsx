import { PuffLoader } from 'react-spinners';
import s from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={s.overlay}>
      <div className={s.loader}>
        <PuffLoader color="var(--accent)" size={100} />
      </div>
    </div>
  );
};
