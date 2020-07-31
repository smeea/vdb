import React, { useState } from 'react';
import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';

function Crypt(props) {
  const [cards, setCards] = useState([]);

  const setResults = (cards) => {
    setCards(cards);
  };

  return (
    <div className="container main-container py-xl-3 px-0 px-xl-2">
      <div className="row mx-0">
        <div className="col-md-12 col-lg-2 col-xl-2 left-col px-1 px-xl-2">
          CARD PREVIEW ON HOVER
        </div>
        <div className="col-md-12 col-lg-7 col-xl-7 center-col px-1 px-xl-2">
          <ResultCrypt cards={cards}/>
        </div>

        <div className="col-md-12 col-lg-3 col-xl-3 right-col px-1 px-xl-2">
          <SearchCryptForm setResults={setResults} />
        </div>
      </div>
    </div>
  );
}

export default Crypt;
