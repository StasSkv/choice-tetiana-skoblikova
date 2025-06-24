import React, { useState } from 'react';
import s from './Catalog.module.css';
import { motion } from 'framer-motion';

const brends = [
  'Всі товари',
  'Biox',
  'White Mandarin',
  'Choice Phyto',
  'Pro Healthy',
  'Green Max',
  'Добра їжа',
];

const sort = ['За популярністю', 'Від найдешевших', 'Від найдорожчих', 'За назвою'];

export const Catalog = () => {
  const [checkedBrends, setCheckedBrends] = useState(() => brends.map((_, idx) => idx === 0));
  const [checkedSort, setCheckedSort] = useState(() => sort.map((_, idx) => idx === 0));

  const handleChangeBrends = (index) => {
    const updated = [...checkedBrends];
    if (index === 0) {
      updated.fill(false);
      updated[0] = true;
    } else {
      updated[index] = !updated[index];
      updated[0] = false;
      const anyChecked = updated.some((val, idx) => idx !== 0 && val);
      if (!anyChecked) updated[0] = true;
    }
    setCheckedBrends(updated);
  };

  const handleChangeSort = (index) => {
    const updated = checkedSort.map((_, i) => i === index);
    setCheckedSort(updated);
  };

  return (
    <div className={s.catalogWrap}>
      <div>
        <h3>БРЕНДИ КОМПАНІЇ</h3>
        <motion.ul>
          {brends.map((name, idx) => (
            <motion.li key={name}>
              <motion.label
                className={`${s.label} ${checkedBrends[idx] ? s.active : ''}`}
                whileHover={{ scale: 1.05, color: 'var(--accent)' }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  className={s.checkbox}
                  checked={checkedBrends[idx]}
                  onChange={() => handleChangeBrends(idx)}
                />
                <span>{name}</span>
              </motion.label>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div>
        <h3>Сортувати за</h3>
        <motion.ul>
          {sort.map((name, idx) => (
            <motion.li key={name}>
              <motion.label
                className={`${s.label} ${checkedSort[idx] ? s.active : ''}`}
                whileHover={{ scale: 1.05, color: 'var(--accent)' }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  className={s.checkbox}
                  checked={checkedSort[idx]}
                  onChange={() => handleChangeSort(idx)}
                />
                <span>{name}</span>
              </motion.label>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};
