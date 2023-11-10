import { useEffect, useState } from 'react';
import axios from 'axios';
import sun from '../../assets/desktop/icon-sun.svg';
import moon from '../../assets/desktop/icon-moon.svg';
import up from '../../assets/desktop/icon-arrow-up.svg';
import s from './Body.module.css';

export const Body = ({ setIsVisibleFooter, isVisibleFooter,currentTimeDay,setCurrentTimeDay ,currentTime,setCurrentTime}) => {


  const [AmOrPm, setAmOrPm] = useState('');
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const hour12system = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    '11': 11,
    '12': 12,
    '13': 1,
    '14': 2,
    '15': 3,
    '16': 4,
    '17': 5,
    '18': 6,
    '19': 7,
    '20': 8,
    '21': 9,
    '22': 10,
    '23': 11,
    '24': 12,

  };
  const getTime = () => {
    axios.get(`http://worldtimeapi.org/api/timezone/Europe/Kyiv`)
      .then(response => {
        setCurrentTime(response.data);
      })
      .catch(error => {
        console.error('Error getting time', error);
      });
  };

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentTime?.datetime) {
      const timeString = currentTime.datetime.split('T')[1]?.split('.')[0];
      const [hourString, minuteString] = timeString.split(':');

      setMinutes(minuteString);
      if (+hourString >= 0 && +hourString < 6) {
        setHour(hour12system[hourString]);
        setCurrentTimeDay('Night');
        setAmOrPm('Am');
      } else if (+hourString > 6 && +hourString < 12) {
        setHour(hour12system[hourString]);
        setCurrentTimeDay('Morning');
        setAmOrPm('Am');
      } else if (+hourString >= 12 && +hourString < 18) {
        setHour(hour12system[hourString]);
        setCurrentTimeDay('Day');
        setAmOrPm('Pm');
      } else {
        setHour(hour12system[hourString]);
        setCurrentTimeDay('Evening');
        setAmOrPm('Pm');
      }
    }
  }, [currentTime]);

  return (AmOrPm ? <main className={s.wrapper}>
    <div className={s.leftSide}>
      <div >
        <div className={s.goodTimeAndSun}>
        {currentTimeDay === 'Night' || currentTimeDay === 'Evening' ? <img src={moon} alt="moon" /> :
          <img src={sun} alt="sun" className={s.sun} />}
        <span className={s.goodTime}>GOOD {currentTimeDay.toUpperCase()}, IT'S CURRENTLY</span>
      </div>
        <h2 className={s.hour}>{hour}:{minutes}</h2>
      </div>
      <div className={s.pm}>
        <span>
          {AmOrPm}
        </span>
        <span>
          {currentTime.abbreviation}
        </span>
      </div>
    </div>
    <button
      className={s.expand} onClick={() => setIsVisibleFooter(prevstate => !prevstate)}
    >
      {!isVisibleFooter ? 'more' : 'less'}
      <img
        src={up} alt="up"
        style={{
          transform: `rotate(${isVisibleFooter ? 0 : 180}deg)`, transition: `transform 1s ease`,
        }}
      />
    </button>
  </main> : '');
};

//  const [timeZone, setTimeZone] = useState('');
// useEffect(() => {
//   const ipBase = new Ipbase('ipb_live_VxVr1aEZPQywVK5ypCGs78xGSscoW4QQ71x7dGTl');
//   ipBase.info().then(response => {
//     setTimeZone(response.data.timezone.id);
//     console.log(response?.data?.timezone?.id);
//   }).catch(error => {
//     console.error('Error getting timeZone', error);
//   });
// }, []);

// axios.get(`http://worldtimeapi.org/api/timezone/${timeZone}`)
