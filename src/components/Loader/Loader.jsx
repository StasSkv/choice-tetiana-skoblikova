import s from './Loader.module.scss';
import { PuffLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <div className={s.overlay}>
      <div className={s.loader}>
        <PuffLoader color="var(--accent)" size={100} />
      </div>
    </div>
  );
};
