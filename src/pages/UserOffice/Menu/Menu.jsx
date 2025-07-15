import s from './Menu.module.css';

export const Menu = () => {
  return (
    <nav className={s.catalogWrap}>
      <h3 className={s.menuTitle}>Меню кабінету</h3>
      <ul className={s.menuList}>
        <li>
          <a href="#info" className={s.menuLink}>
            Мої дані
          </a>
        </li>
        <li>
          <a href="#history" className={s.menuLink}>
            Історія замовлень
          </a>
        </li>
        <li>
          <a href="#reviews" className={s.menuLink}>
            Мої відгуки
          </a>
        </li>
        <li>
          <a href="#favorites" className={s.menuLink}>
            Улюблені товари
          </a>
        </li>
        <li>
          <a href="#viewed" className={s.menuLink}>
            Нещодавно переглянуті
          </a>
        </li>
      </ul>
    </nav>
  );
};
