import s from './Home.module.css';
import tetiana from '../../assets/images/tetiana.jpeg';
import { motion } from 'framer-motion';


const Home = () => {
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
            <div className={s.hello}>
              <h2>
                <span>Вітаю</span>, мене звати Тетяна Скоблікова!
              </h2>
              <p>Якщо ви буде в мене замовляти багато продукції - то я куплю собі бібіку!</p>
            </div>
            <img src={tetiana} alt="" className={s.tetiana} />
          </div>
        </section>

        <section className={s.aboutMe}>
          <div className={`container ${s.container}`}></div>
        </section>
      </>
    </motion.div>
  );
};

export default Home;
