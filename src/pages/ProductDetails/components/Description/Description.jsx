import s from './Description.module.css';
import { Fragment } from 'react';

export const Description = ({ info }) => {
  return (
    <ul className={s.descriptions}>
      {info.map((item, index) => {
        const normalizedDesc = item.desc.replace(/\\n/g, '\n').replace(/\\/g, '');
        return (
          <li key={index}>
            <h4>{item.name}</h4>
            <p>
              {normalizedDesc.split('\n').map((line, idx) => (
                <Fragment key={idx}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
