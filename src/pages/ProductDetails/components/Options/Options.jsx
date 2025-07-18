import s from './Options.module.scss';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
import { Fragment } from 'react';

export const Options = ({ info }) => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const contentRefs = useRef([]);

  const titles = {
    actions: 'ДІЯ АКТИВНИХ КОМПОНЕНТІВ',
    using: 'СПОСІБ ВИКОРИСТАННЯ',
    recommendations: 'РЕКОМЕНДАЦІЇ',
    composition: 'СКЛАД',
    reservation: 'ЗАСТЕРЕЖЕННЯ',
    contraindication: 'ПРОТИПОКАЗАННЯ',
    notСontain: 'НЕ МІСТИТЬ',
    properties: 'ВЛАСТИВОСТІ',
    termOfTheCondition: 'ТЕРМІН ЗБЕРІГАННЯ, УМОВИ ЗБЕРІГАННЯ',
    advice: 'ПОРАДИ',
  };

  const toggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;
      el.style.height = openIndexes.includes(index) ? `${el.scrollHeight}px` : '0px';
    });
  }, [openIndexes]);

  if (!info || info.length === 0) return null;

  const [first, ...rest] = info;

  return (
    <div className={s.container}>
      <h3 className={s.title}>Інформація про продукт</h3>
      <ul className={s.descriptions}>
        {info[0].actions.length > 0 && (
          <li className={s.item}>
            <button className={s.header} onClick={() => toggle(0)}>
              {titles[first.name] || 'ДІЯ АКТИВНИХ КОМПОНЕНТІВ'}
              <span className={`${s.icon} ${openIndexes.includes(0) ? s.openIcon : ''}`}>
                <IoIosArrowDropdown />
              </span>
            </button>
            <div ref={(el) => (contentRefs.current[0] = el)} className={s.contentWrapper}>
              <div className={s.content}>
                <ul>
                  {first.actions.map((action, i) => (
                    <li key={i}>
                      <p>
                        <strong>{action.name}</strong>
                      </p>
                      <p>
                        {action.desc
                          .replace(/\\n/g, '\n')
                          .replace(/\\/g, '')
                          .split('\n')
                          .map((line, idx) => (
                            <Fragment key={idx}>
                              {line}
                              <br />
                            </Fragment>
                          ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        )}

        {rest.map((item, i) => {
          const realIndex = i + 1;
          return (
            <li key={realIndex} className={s.item}>
              <button className={s.header} onClick={() => toggle(realIndex)}>
                {titles[item.name] || 'РОЗДІЛ'}
                <span className={`${s.icon} ${openIndexes.includes(realIndex) ? s.openIcon : ''}`}>
                  <IoIosArrowDropdown />
                </span>
              </button>
              <div ref={(el) => (contentRefs.current[realIndex] = el)} className={s.contentWrapper}>
                <div className={s.content}>
                  <p>
                    {item.desc
                      .replace(/\\n/g, '\n')
                      .replace(/\\/g, '')
                      .split('\n')
                      .map((line, idx) => (
                        <Fragment key={idx}>
                          {line}
                          <br />
                        </Fragment>
                      ))}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
