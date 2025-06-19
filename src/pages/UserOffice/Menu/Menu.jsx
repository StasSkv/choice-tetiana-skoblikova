import s from './Menu.module.css';

export const Menu = () => {
  return (
    <div className={s.catalogWrap}>
      <h3>Меню:</h3>
      <ul>
        <li>
          <a href="#info">Мої данні</a>
        </li>
        <li>
          <a href="#history">Історія замовлень</a>
        </li>
        <li>
          <a href="#reviews">Мої відгуки</a>
        </li>
        <li>
          <a href="#favorites">Улюбленні товари</a>
        </li>
        <li>
          <a href="#viewed">Нещодавно переглянуті</a>
        </li>
      </ul>
    </div>
  );
};
