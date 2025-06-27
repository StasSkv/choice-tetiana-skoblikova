import s from './Details.module.css';

export const Details = ({ info }) => {
  return (
    <ul className={s.details}>
      {info.map((item, index) => (
        <li key={index}>
          <p>
            {item.name}
            <span>{item.desc}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};
