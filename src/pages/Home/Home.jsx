import s from './Home.module.css';
import tetiana from "../../assets/images/tetiana.jpeg"
const Home = () => {
    return (
      <section className={s.hero}>
        <div className={`container ${s.container}`}>
          <h2>Привіт, я Скоблікова Тетяна</h2>
          <p> Якщо ти будеш замовляти в мене багато продукції, то я куплю собі бібіку!</p>
          <img src={tetiana} alt="" className={s.tetiana} />
        </div>
      </section>
    );
};

export default Home;
