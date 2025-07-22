import s from './Actions.module.scss';

export const Actions = ({ info }) => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Дія</h3>
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
