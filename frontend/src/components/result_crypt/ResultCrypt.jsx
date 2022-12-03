import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import X from 'assets/images/icons/x.svg';
import Plus from 'assets/images/icons/plus.svg';
import {
  ResultCryptTable,
  ResultCryptTotal,
  ResultCryptTotalInfo,
} from 'components';
import { cryptSort } from 'utils';
import { useApp, deckStore } from 'context';

const ResultCrypt = ({ cards, setCards, inCompare }) => {
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
  const navigate = useNavigate();
  const deck = useSnapshot(deckStore).deck;
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;
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
    navigate('/crypt');
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
        <div className="flex items-center justify-center error-message">
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
          className="flex float-right-bottom float-clear items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
      {isMobile && showFloatingButtons && isEditable && (
        <div
          onClick={() => toggleAddMode()}
          className={`flex float-right-middle float-add-${
            addMode ? 'on' : 'off'
          } items-center justify-center`}
        >
          <Plus viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default ResultCrypt;
