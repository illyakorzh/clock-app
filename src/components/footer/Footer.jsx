import s from './Footer.module.css';

export const Footer = ({ currentTimeDay, currentTime }) => {
  const {
    day_of_week, day_of_year, timezone, week_number
  } = currentTime;

  return (
    <div className={`${s.wrapper} ${currentTimeDay === 'Night' || currentTimeDay === 'Evening' ? s.wrapperNight : s.wrapperDay} `}>

      <div className={s.box }>
        <div className={s.subBox}>
        <span className={s.param}>CURRENT TIMEZONE</span>
        <span className={s.info}>{timezone}</span>
        </div>
      </div>

      <div className={s.box}>
        <div className={s.subBox}>
        <span className={s.param}>DAY OF THE YEAR</span>
        <span className={s.info}>{day_of_year}</span>
      </div>
      </div>

      <div className={s.box}>
        <div className={s.subBox}>
        <span className={s.param}>DAY OF THE WEEK</span>
        <span className={s.info}>{day_of_week}</span>
      </div>
      </div>

      <div className={s.box}>
        <div className={s.subBox}>
        <span className={s.param}>WEEK NUMBER</span>
        <span className={s.info}>{week_number}</span>
      </div>
      </div>

    </div>);
};
