import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './Quote.module.css';
import CachedIcon from '@mui/icons-material/Cached';

export const Quote = () => {
  const [quoteData, setQuoteData] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);

  const fetchQuote = () => {
    axios.get('https://api.quotable.io/random/')
      .then(response => setQuoteData(response.data))
      .catch(error => setQuoteData({ content: 'Error getting quote', author: error.message }));
  };

  useEffect(() => {    fetchQuote();  }, []);

  const rotateImage = () => {
    fetchQuote();
    setRotationAngle(prevState => prevState+360);
  };

  return (
    <header className={s.wrapper}>
      <div className={s.wrapperQuote}>
        <q>{quoteData.content}</q>
        <cite>{quoteData.author}</cite>
      </div>
      <CachedIcon
        style={{
          transform: `rotate(${rotationAngle}deg)`,
          transition: `transform 1s ease`,
      }}
        onClick={rotateImage}
      />
    </header>
  );
};



