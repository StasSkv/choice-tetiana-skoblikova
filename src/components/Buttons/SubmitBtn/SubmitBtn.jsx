import s from './SubmitBtn.module.scss';
import { motion } from 'framer-motion';

export const SubmitBtn = ({ children }) => {
  return (
    <motion.button type="submit" className={s.submitBtn} whileTap={{ scale: 0.98 }}>
      {children}
    </motion.button>
  );
};
