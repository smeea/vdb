import React, { useState, useEffect } from 'react';
import X from '../../assets/images/icons/x.svg';
import ResultLibraryTable from './ResultLibraryTable.jsx';
import ResultLibraryTotal from './ResultLibraryTotal.jsx';
import resultLibrarySort from './resultLibrarySort.js';

function ResultLibrary(props) {
  const [sortedCards, setSortedCards] = useState([]);

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultLibrarySort(props.cards, method));
  };

  const handleClear = () => {
    props.setResults(undefined);
    props.setShowSearch(!props.showSearch);
  };

  useEffect(() => {
    setSortedCards(() => resultLibrarySort(props.cards, props.sortMethod));
  }, [props.cards, props.sortMethod]);

  return (
    <>
      {props.showTotal == true && props.cards.length > 0 && (
        <ResultLibraryTotal
          cards={props.cards}
          value={props.sortMethod}
          handleChange={handleChange}
          showSort={props.showSort}
        />
      )}
      <ResultLibraryTable
        showImage={props.showImage}
        setShowImage={props.setShowImage}
        library={props.library}
        activeDeck={props.activeDeck}
        deckCardAdd={props.deckCardAdd}
        resultCards={sortedCards}
        isMobile={props.isMobile}
        isWide={true}
        addMode={props.addMode}
      />
      {props.isMobile && (
        <a onClick={handleClear} className="float-1 clear">
          <div className="pt-1 float-clear">
            <X viewBox="0 0 16 16" />
          </div>
        </a>
      )}
    </>
  );
}

export default ResultLibrary;
