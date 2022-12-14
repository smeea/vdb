import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import X from 'assets/images/icons/x.svg';
import Plus from 'assets/images/icons/plus.svg';
import {
  ResultCryptTable,
  ResultCryptTotal,
  ResultCryptTotalInfo,
  ButtonFloat,
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
        <div className="error-message flex items-center justify-center">
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
            <div className="info-message ">
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
        <ButtonFloat onClick={handleClear} variant="float-clear">
          <X width="40" height="auto" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
      {isMobile && showFloatingButtons && isEditable && (
        <ButtonFloat
          onClick={toggleAddMode}
          position="middle"
          variant={addMode ? 'float-add-on' : 'float-add-off'}
        >
          <Plus width="47" height="auto" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default ResultCrypt;
