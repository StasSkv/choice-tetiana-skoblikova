import { useState } from 'react';
import s from './Options.module.css';

const titles = {
    actions: 'ДІЯ АКТИВНИХ КОМПОНЕНТІВ',
  using: 'СПОСІБ ВИКОРИСТАННЯ',
  recommendations: 'РЕКОМЕНДАЦІЇ',
  composition: 'СКЛАД',
  reservation: 'ЗАСТЕРЕЖЕННЯ',
  notСontain: 'НЕ МІСТИТЬ',
};

export const Options = ({ info }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={s.container}>
      <h3 className={s.title}>Інформація про продукт</h3>
      <ul className={s.descriptions}>
        {info.map((item, index) => (
          <li key={index} className={s.item}>
            <button className={s.header} onClick={() => toggle(index)}>
              {item.name ? titles[item.name] : 'ДІЯ АКТИВНИХ КОМПОНЕНТІВ'}
              <span className={`${s.icon} ${openIndex === index ? s.open : ''}`}>⌄</span>
            </button>

            {openIndex === index && (
              <div className={s.content}>
                {Array.isArray(item.actions) ? (
                  <ul>
                    {item.actions.map((action, i) => (
                      <li key={i}>
                        <p>
                          <strong>{action.name}</strong>
                        </p>
                        <p>{action.desc}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.desc}</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
