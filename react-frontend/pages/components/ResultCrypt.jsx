import React, { useState, useEffect } from 'react';
import ResultCryptTable from './ResultCryptTable.jsx';
import ResultCryptTotal from './ResultCryptTotal.jsx';
import resultCryptSort from './resultCryptSort.js';

function ResultCrypt(props) {
  const [sortedCards, setSortedCards] = useState([]);

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultCryptSort(props.cards, method));
  };

  useEffect(() => {
    setSortedCards(() => resultCryptSort(props.cards, props.sortMethod));
  }, [props.cards, props.sortMethod]);

  return (
    <>
      {props.showTotal == true && props.cards.length > 0 && (
        <ResultCryptTotal
          cards={props.cards}
          sortedCards={sortedCards}
          value={props.sortMethod}
          handleChange={handleChange}
          showSort={props.showSort}
        />
      )}
      <ResultCryptTable
        showImage={props.showImage}
        setShowImage={props.setShowImage}
        toggleImage={props.toggleImage}
        crypt={props.crypt}
        activeDeck={props.activeDeck}
        deckCardAdd={props.deckCardAdd}
        resultCards={sortedCards}
        isMobile={props.isMobile}
        addMode={props.addMode}
      />
    </>
  );
}

export default ResultCrypt;
