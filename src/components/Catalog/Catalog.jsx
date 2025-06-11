import s from './Catalog.module.css';

export const Catalog = () => {
  return (
    <div className={s.catalog}>
      <button className={s.btnSection}>Biox</button>
      <button className={s.btnSection}>White Mandarin</button>
      <button className={s.btnSection}>Choice Phyto</button>
      <button className={s.btnSection}>Pro Healthy</button>
      <button className={s.btnSection}>Green Max</button>
      <button className={s.btnSection}>Добра їжа</button>
    </div>
  );
};
