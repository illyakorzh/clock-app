import './index.css';
import s from './App.module.css';
import { Quote } from './components/quote/Quote';
import { Body } from './components/body/Body';
import { useState } from 'react';
import { Footer } from './components/footer/Footer';

export function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [isVisibleFooter, setIsVisibleFooter] = useState(false);
  const [currentTimeDay, setCurrentTimeDay] = useState('');
  return (<div className={`${s.App} ${currentTimeDay === 'Night' || currentTimeDay === 'Evening'? s.AppNight  : s.AppDay} `} >
    <div className={s.filter}>
      <div className={`${s.container} ${isVisibleFooter ? s.visibleFooter : s.invisibleFooter} `}>
      <Quote />
      <Body
            setIsVisibleFooter={setIsVisibleFooter}
            isVisibleFooter={isVisibleFooter}
            currentTimeDay={currentTimeDay}
            setCurrentTimeDay={setCurrentTimeDay}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
      />


      <Footer
              currentTimeDay={currentTimeDay}
              currentTime={currentTime}
              />
      </div>
    </div>
  </div>);
}




