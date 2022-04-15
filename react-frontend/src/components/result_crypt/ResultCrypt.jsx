import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import X from 'assets/images/icons/x.svg';
import Plus from 'assets/images/icons/plus.svg';
import {
  ResultCryptTable,
  ResultCryptTotal,
  ResultCryptTotalInfo,
} from 'components';
import { resultCryptSort } from 'utils';
import { useApp } from 'context';

const ResultCrypt = ({ cards, setCards, crypt, activeDeck, inCompare }) => {
  const {
    showCryptSearch,
    setShowCryptSearch,
    addMode,
    toggleAddMode,
    isMobile,
    cryptSearchSort,
    changeCryptSearchSort,
  } = useApp();

  const [sortedCards, setSortedCards] = useState([]);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const className = 'search-crypt-table';
  const navigate = useNavigate();

  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);

  const handleChange = (method) => {
    changeCryptSearchSort(method);
    setSortedCards(() => resultCryptSort(cards, method));
  };

  const handleClear = () => {
    navigate('/crypt');
    setCards(undefined);
    setShowCryptSearch(!showCryptSearch);
  };

  useEffect(() => {
    setSortedCards(() => resultCryptSort(cards, cryptSearchSort));
  }, [cards]);

  return (
    <>
      {!isMobile && cards.length == 0 && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>NO CARDS FOUND</b>
        </div>
      )}
      {cards.length > 0 && (
        <>
          <ResultCryptTotal
            inCompare={inCompare}
            cards={cards}
            toggleShowInfo={toggleShowInfo}
            handleChange={handleChange}
          />
          {showInfo && (
            <div className="info-message px-2">
              <ResultCryptTotalInfo cards={cards} />
            </div>
          )}
          <ResultCryptTable
            className={className}
            crypt={crypt}
            activeDeck={activeDeck}
            resultCards={sortedCards}
            setShowFloatingButtons={setShowFloatingButtons}
          />
        </>
      )}
      {isMobile && showFloatingButtons && (
        <div
          onClick={handleClear}
          className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
      {isMobile && showFloatingButtons && activeDeck.src === 'my' && (
        <div
          onClick={() => toggleAddMode()}
          className={`d-flex float-right-middle float-add-${
            addMode ? 'on' : 'off'
          } align-items-center justify-content-center`}
        >
          <Plus viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default ResultCrypt;
