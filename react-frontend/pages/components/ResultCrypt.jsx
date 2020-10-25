import React, { useState, useEffect } from 'react';

import ResultCryptTable from './ResultCryptTable.jsx';
// import ResultCryptSortForm from './ResultCryptSortForm.jsx';
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
      {/* {props.showSort == true && sortedCards.length > 0 && ( */}
      {/*   <ResultCryptSortForm */}
      {/*     value={props.sortMethod} */}
      {/*     onChange={handleChange} */}
      {/*   /> */}
      {/* )} */}
      <ResultCryptTable
        showImage={props.showImage}
        toggleImage={props.toggleImage}
        activeDeck={props.activeDeck}
        deckCardAdd={props.deckCardAdd}
        resultCards={sortedCards}
      />
    </>
  );
}

export default ResultCrypt;
