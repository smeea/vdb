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
    isDesktop,
    cryptSearchSort,
    changeCryptSearchSort,
    showFloatingButtons,
  } = useApp();

  const [sortedCards, setSortedCards] = useState([]);
  const className = 'search-crypt-table';
  const navigate = useNavigate();

  const sortMethods = {
    'Capacity - Max to Min': 'C↓',
    'Capacity - Min to Max': 'C↑',
    Clan: 'Cl',
    Group: 'G',
    Name: 'N',
    Sect: 'S',
  };

  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);

  const setSortMethod = (method) => {
    changeCryptSearchSort(method);
    setSortedCards(() => resultCryptSort(cards, method));
  };

  const handleClear = () => {
    navigate('/crypt');
    setCards(undefined);
    setShowCryptSearch(!showCryptSearch);
  };

  useEffect(() => {
    if (cards) {
      setSortedCards(() => resultCryptSort(cards, cryptSearchSort));
    }
  }, [cards]);

  return (
    <>
      {!isMobile && (cards === null || cards.length === 0) && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>{cards === null ? 'CONNECTION PROBLEM' : 'NO CARDS FOUND'}</b>
        </div>
      )}
      {cards && cards.length > 0 && (
        <>
          <ResultCryptTotal
            inCompare={inCompare}
            cards={cards}
            toggleShowInfo={toggleShowInfo}
            sortMethods={sortMethods}
            sortMethod={cryptSearchSort}
            setSortMethod={setSortMethod}
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
            placement={
              isDesktop || (!isDesktop && !addMode) ? 'right' : 'bottom'
            }
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
