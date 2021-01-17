import React, { useState, useEffect } from 'react';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
import AlertMessage from './AlertMessage.jsx';
import ResultCryptTable from './ResultCryptTable.jsx';
import ResultCryptTotal from './ResultCryptTotal.jsx';
import resultCryptSort from './resultCryptSort.js';

function ResultCrypt(props) {
  const [sortedCards, setSortedCards] = useState([]);

  const className = 'search-crypt-table';

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultCryptSort(props.cards, method));
  };

  const handleClear = () => {
    props.setResults(undefined);
    props.setShowSearch(!props.showSearch);
  };

  useEffect(() => {
    setSortedCards(() => resultCryptSort(props.cards, props.sortMethod));
  }, [props.cards, props.sortMethod]);

  return (
    <>
      {!props.isMobile && props.cards.length == 0 && (
        <AlertMessage className="error-message">
          <b>NO CARDS FOUND</b>
        </AlertMessage>
      )}
      {props.showTotal == true && props.cards.length > 0 && (
        <ResultCryptTotal
          cards={props.cards}
          value={props.sortMethod}
          handleChange={handleChange}
          showSort={props.showSort}
        />
      )}
      <ResultCryptTable
        className={className}
        showImage={props.showImage}
        setShowImage={props.setShowImage}
        crypt={props.crypt}
        activeDeck={props.activeDeck}
        deckCardAdd={props.deckCardAdd}
        resultCards={sortedCards}
        isMobile={props.isMobile}
        isWide={true}
        addMode={props.addMode}
      />
      {props.isMobile && (
        <>
          <div onClick={handleClear} className="float-right-bottom clear">
            <div className="pt-1 float-clear">
              <X viewBox="0 0 16 16" />
            </div>
          </div>
          {props.addMode ? (
            <div onClick={() => props.setAddMode(!props.addMode)} className="float-left-bottom add-on">
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16"/>
              </div>
            </div>
          ) : (
            <div onClick={() => props.setAddMode(!props.addMode)} className="float-left-bottom add-off">
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16"/>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ResultCrypt;
