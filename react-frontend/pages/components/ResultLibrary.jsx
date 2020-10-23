import React, { useState, useEffect } from 'react';

import ResultLibraryTable from './ResultLibraryTable.jsx';
import ResultLibrarySortForm from './ResultLibrarySortForm.jsx';
import ResultLibraryTotal from './ResultLibraryTotal.jsx';
import resultLibrarySort from './resultLibrarySort.js';

function ResultLibrary(props) {
  const [sortedCards, setSortedCards] = useState([]);

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultLibrarySort(props.cards, method));
  };

  useEffect(() => {
    setSortedCards(() => resultLibrarySort(props.cards, props.sortMethod));
  }, [props.cards, props.sortMethod]);

  return (
    <>
      {props.showTotal == true && props.cards.length > 0 && (
        <ResultLibraryTotal cards={props.cards} />
      )}
      {props.showSort == true && sortedCards.length > 0 && (
        <ResultLibrarySortForm
          value={props.sortMethod}
          onChange={handleChange}
        />
      )}
      <ResultLibraryTable
        showImage={props.showImage}
        toggleImage={props.toggleImage}
        activeDeck={props.activeDeck}
        deckCardAdd={props.deckCardAdd}
        resultCards={sortedCards}
      />
    </>
  );
}

export default ResultLibrary;
