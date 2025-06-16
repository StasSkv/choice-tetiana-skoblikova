import s from './Team.module.css';
import { motion } from 'framer-motion';

export const Team = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <section className={s.team}>
        <div className={`container ${s.container}`}>
          <h2>Це моя команда</h2>
        </div>
      </section>
    </motion.div>
  );
};
