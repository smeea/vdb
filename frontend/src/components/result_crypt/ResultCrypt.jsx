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
  ErrorMessage,
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
        <ErrorMessage>
          {cards === null ? 'CONNECTION PROBLEM' : 'NO CARDS FOUND'}
        </ErrorMessage>
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
            <div className="bg-bgSecondary dark:bg-bgSecondaryDark ">
              <ResultCryptTotalInfo cards={cards} />
            </div>
          )}
          <ResultCryptTable
            resultCards={sortedCards}
            placement={
              isDesktop || (!isDesktop && !addMode) ? 'right' : 'bottom'
            }
          />
        </>
      )}
      {isMobile && showFloatingButtons && (
        <ButtonFloat onClick={handleClear} variant="danger">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
      {isMobile && showFloatingButtons && isEditable && (
        <ButtonFloat
          onClick={toggleAddMode}
          position="middle"
          variant="primary"
        >
          <Plus width="47" height="47" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default ResultCrypt;
