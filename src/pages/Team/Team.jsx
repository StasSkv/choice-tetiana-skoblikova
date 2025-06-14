import s from './Team.module.css';


export const Team = () => {
  return (
    <section className={s.team}>
      <div className={`container ${s.container}`}>
        <h2>Це моя команда</h2>
      </div>
    </section>
  );
};
