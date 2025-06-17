import s from './Placing.module.css';
import { motion } from 'framer-motion';


export const Placing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
    >
      <>
        <section className={s.hero}>
                  <div className={`container ${s.container}`}>
                      <p>здрасте</p>
          </div>
        </section>
      </>
    </motion.div>
  );
};
