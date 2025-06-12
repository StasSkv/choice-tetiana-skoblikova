import s from './Description.module.css';

export const Description = ({ info }) => {
  return (
    <ul className={s.descriptions}>
      {info.map((item, index) => (
        <li key={index}>
          <h4>{item.name}</h4>
          <p>{item.desc}</p>
        </li>
      ))}
    </ul>
  );
};

