import s from './Advantages.module.css';

export const Advantages = ({ info }) => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Переваги</h3>
      <ul className={s.descriptions}>
        {info.map((item, index) => (
          <li key={index}>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
