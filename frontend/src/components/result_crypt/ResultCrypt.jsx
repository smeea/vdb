import React, { useState, useMemo } from 'react';
import X from 'assets/images/icons/x.svg';
import Plus from 'assets/images/icons/plus.svg';
import {
  ResultCryptTable,
  ResultCryptTotal,
  ResultCryptTotalInfo,
} from 'components';
import { cryptSort } from 'utils';
import { useApp, clearSearchForm } from 'context';

const ResultCrypt = ({ cards, setCards, isAuthor, inCompare }) => {
  const {
    setShowCryptSearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    cryptSearchSort,
    changeCryptSearchSort,
    showFloatingButtons,
  } = useApp();

  const className = 'search-crypt-table';

  const sortMethods = {
    'Capacity - Max to Min': 'C↓',
    'Capacity - Min to Max': 'C↑',
    Clan: 'CL',
    Group: 'G',
    Name: 'N',
    Sect: 'S',
  };

  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);

  const handleClear = () => {
    clearSearchForm('crypt');
    setCards(undefined);
    setShowCryptSearch(true);
  };

  const sortedCards = useMemo(
    () => cryptSort(cards, cryptSearchSort),
    [cards, cryptSearchSort]
  );

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
            setSortMethod={changeCryptSearchSort}
          />
          {showInfo && (
            <div className="info-message px-2">
              <ResultCryptTotalInfo cards={cards} />
            </div>
          )}
          <ResultCryptTable
            className={className}
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
      {isMobile && showFloatingButtons && isAuthor && (
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
