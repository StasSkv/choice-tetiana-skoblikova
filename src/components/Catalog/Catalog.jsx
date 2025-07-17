import s from './Catalog.module.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters } from '../../redux/productsSlice/productsSelectors.js';
import { setFilters } from '../../redux/productsSlice/productsSlice.js';

const categories = [
  { label: 'Всі товари', value: 'all' },
  { label: 'Biox', value: 'biox' },
  { label: 'White Mandarin', value: 'white-mandarine' },
  { label: 'Choice Phyto', value: 'choice-phyto' },
  { label: 'Pro Healthy', value: 'pro-healthy' },
  { label: 'Green Max', value: 'green-max' },
  { label: 'Добра їжа', value: 'good-food' },
  { label: 'Набори', value: 'sets' },
];

const sortOptions = [
  { label: 'За популярністю', name: 'averageRating', sortBy: 'averageRating', sortOrder: 'desc' },
  { label: 'Від найдешевших', name: 'priceAsc', sortBy: 'price', sortOrder: 'asc' },
  { label: 'Від найдорожчих', name: 'priceDesc', sortBy: 'price', sortOrder: 'desc' },
];

export const Catalog = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectFilters);
  const [checkedCategories, setCheckedCategories] = useState(params.category);
  const [checkedSort, setCheckedSort] = useState(
    params.sortBy && params.sortOrder ? `${params.sortBy}-${params.sortOrder}` : ''
  );

  const handleChangeCategories = (value) => {
    dispatch(setFilters({ category: value, page: 1 }));
    setCheckedCategories(value);
  };

  const handleChangeSort = (sortBy, sortOrder) => {
    const sortKey = `${sortBy}-${sortOrder}`;
    if (checkedSort === sortKey) {
      setCheckedSort('');
      dispatch(setFilters({ sortBy: '', sortOrder: '', page: 1 }));
    } else {
      setCheckedSort(sortKey);
      dispatch(setFilters({ sortBy, sortOrder, page: 1 }));
    }
  };

  return (
    <div className={s.catalogWrap}>
      <div>
        <h3>БРЕНДИ КОМПАНІЇ</h3>
        <motion.ul>
          {categories.map((item) => (
            <motion.li key={item.value}>
              <motion.label
                className={`${s.label} ${checkedCategories === item.value ? s.active : ''}`}
                whileHover={{ scale: 1.05, color: 'var(--accent)' }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  className={s.checkbox}
                  checked={checkedCategories === item.value}
                  onChange={() => handleChangeCategories(item.value)}
                />
                <span>{item.label}</span>
              </motion.label>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div>
        <h3>Сортувати за</h3>
        <motion.ul>
          {sortOptions.map(({ label, sortBy, sortOrder }) => {
            const sortKey = `${sortBy}-${sortOrder}`;
            return (
              <li key={label}>
                <label className={`${s.label} ${checkedSort === sortKey ? s.active : ''}`}>
                  <input
                    type="checkbox"
                    className={s.checkbox}
                    checked={checkedSort === sortKey}
                    onChange={() => handleChangeSort(sortBy, sortOrder)}
                  />
                  {label}
                </label>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
};
