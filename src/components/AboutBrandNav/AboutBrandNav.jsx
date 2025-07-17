import s from './AboutBrandNav.module.scss';
import choicePhyto from '../../assets/images/choice-phyto.png';
import goodFood from '../../assets/images/good-food.png';
import greenMax from '../../assets/images/green-max.png';
import proHealthy from '../../assets/images/pro-healthy.png';
import biox from '../../assets/images/biox.png';
import whiteMandarine from '../../assets/images/white-mandarine.png';

const AboutBrandNav = () => {
  return (
    <div className={s.aboutBrandNav}>
      <ul className={s.aboutBrandNavList}>
        <li className={s.aboutBrandNavItem}>
          <img src={biox} alt="biox" className={s.aboutBrandNavImage} />
        </li>
        <li className={s.aboutBrandNavItem}>
          <img src={whiteMandarine} alt="whiteMandarine" className={s.aboutBrandNavImage} />
        </li>
        <li className={s.aboutBrandNavItem}>
          <img src={goodFood} alt="goodFood" className={s.aboutBrandNavImage} />
        </li>
        <li className={s.aboutBrandNavItem}>
          <img src={proHealthy} alt="proHealthy" className={s.aboutBrandNavImage} />
        </li>
        <li className={s.aboutBrandNavItem}>
          <img src={choicePhyto} alt="choicePhyto" className={s.aboutBrandNavImage} />
        </li>
        <li className={s.aboutBrandNavItem}>
          <img src={greenMax} alt="greenMax" className={s.aboutBrandNavImageGreenMax} />
        </li>
      </ul>
    </div>
  );
};

export default AboutBrandNav;
