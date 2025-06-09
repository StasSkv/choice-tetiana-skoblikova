import s from './Team.module.css';
import team from "../../assets/images/team.jpeg"

export const Team = () => {
  return (
    <section className={s.team}>
      <div className={`container ${s.container}`}>
        <h2>Це моя команда</h2>
        <img src={team} alt="team" className={ s.teamImage} />
      </div>
    </section>
  );
};
