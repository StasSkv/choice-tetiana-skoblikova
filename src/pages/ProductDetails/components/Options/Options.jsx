import { useState, useRef, useEffect } from 'react';
import s from './Options.module.css';
import { IoIosArrowDropdown } from 'react-icons/io';

const titles = {
  actions: 'ДІЯ АКТИВНИХ КОМПОНЕНТІВ',
  using: 'СПОСІБ ВИКОРИСТАННЯ',
  recommendations: 'РЕКОМЕНДАЦІЇ',
  composition: 'СКЛАД',
  reservation: 'ЗАСТЕРЕЖЕННЯ',
  notСontain: 'НЕ МІСТИТЬ',
};

export const Options = ({ info }) => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    info.forEach((_, index) => {
      const el = contentRefs.current[index];
      if (!el) return;

      if (openIndexes.includes(index)) {
        el.style.height = el.scrollHeight + 'px';
      } else {
        el.style.height = '0px';
      }
    });
  }, [openIndexes, info]);

  return (
    <div className={s.container}>
      <h3 className={s.title}>Інформація про продукт</h3>
      <ul className={s.descriptions}>
        {info.map((item, index) => (
          <li key={index} className={s.item}>
            <button className={s.header} onClick={() => toggle(index)}>
              {item.name ? titles[item.name] : 'ДІЯ АКТИВНИХ КОМПОНЕНТІВ'}
              <span className={`${s.icon} ${openIndexes.includes(index) ? s.openIcon : ''}`}>
                <IoIosArrowDropdown />
              </span>
            </button>

            <div ref={(el) => (contentRefs.current[index] = el)} className={s.contentWrapper}>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
