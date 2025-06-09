import { Navigation } from '../Navigation/Navigation';
import s from './AppBar.module.css';
import logo from '../../assets/images/tetiana-logo.png';

export const AppBar = () => {
  return (
    <header className={s.header}>
      <div className={`container ${s.container}`}>
        <div className={s.logoWrap}>
         <a href='/'> <img className={s.logoImg} src={logo} alt="logo" /></a>
        </div>
        <Navigation />
      </div>
    </header>
  );
};
