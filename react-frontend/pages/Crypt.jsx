import React, { useState } from 'react';
import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';

function Crypt(props) {
  const [cards, setCards] = useState([]);

  const setResults = (cards) => {
    setCards(cards);
  };

  return (
    <div className='container main-container py-xl-3 px-0 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-1 col-xl-1 left-col px-1 px-xl-2'>
          PREVIEW
        </div>
        <div className='col-md-12 col-lg-8 col-xl-8 center-col px-1 px-xl-2'>
          <ResultCrypt addMode={props.addMode} cardAdd={props.cardAdd} cards={cards}/>
        </div>

        <div className='col-md-12 col-lg-3 col-xl-3 right-col px-1 px-xl-2'>
          <SearchCryptForm setResults={setResults} />
        </div>
      </div>
    </div>
  );
}

export default Crypt;
