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

  // let d_set = new Set();
  // for (const card of Object.keys(props.cards)) {
  //   for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
  //     d_set.add(d);
  //   };
  // };
  // const disciplines_set = [...d_set].sort();

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
        toggleImage={props.toggleImage}
        activeDeck={props.activeDeck}
        deckCardAdd={props.deckCardAdd}
        resultCards={sortedCards}
      />
    </>
  );
}

export default ResultCrypt;
