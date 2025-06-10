import s from './Home.module.css';
import tetiana from '../../assets/images/tetiana.jpeg';
import TestComponent from '../../components/aaaa/aaaa.jsx';
const Home = () => {
  return (
    <section className={s.hero}>
      <div className={`container ${s.container}`}>
        <h2>Привіт, я Скоблікова Тетяна</h2>
        <p> Якщо ти будеш замовляти в мене багато продукції, то я куплю собі бібіку!</p>
        <img src={tetiana} alt="" className={s.tetiana} />
      </div>
     <TestComponent></TestComponent>
    </section>
  );
};

export default Home;
