import { motion } from 'framer-motion';
import s from './SubmitBtn.module.css';

export const SubmitBtn = ({ children }) => {
  return (
    <motion.button type="submit" className={s.submitBtn} whileTap={{ scale: 0.98 }}>
      {children}
    </motion.button>
  );
};
