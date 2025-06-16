import s from './Home.module.css';
import tetiana from '../../assets/images/tetiana.jpeg';
const Home = () => {
  return (
    <>
      <section className={s.hero}>
        <div className={`container ${s.container}`}>
          <div className={s.hello}>
            <h2>
              <span>Вітаю</span>, мене звати Тетяна Скоблікова!
            </h2>
            <p>
             Якщо ви буде в мене замовляти багато продукції - то я куплю собі бібіку!
            </p>
          </div>
          <img src={tetiana} alt="" className={s.tetiana} />
        </div>
      </section>

      <section className={s.aboutMe}>
        <div className={`container ${s.container}`}></div>
      </section>
    </>
  );
};

export default Home;
