import React, { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import X from 'assets/images/icons/x.svg';
import Plus from 'assets/images/icons/plus.svg';
import {
  ButtonFloat,
  ResultLibraryTable,
  ResultLibraryTotal,
} from 'components';
import { librarySort } from 'utils';
import { useApp, deckStore } from 'context';

const ResultLibrary = ({ cards, setCards, inCompare }) => {
  const {
    setShowLibrarySearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    librarySearchSort,
    changeLibrarySearchSort,
    showFloatingButtons,
  } = useApp();
  const navigate = useNavigate();
  const deck = useSnapshot(deckStore).deck;
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;

  const sortMethods = {
    'Clan / Discipline': 'C/D',
    'Cost - Max to Min': 'C↓',
    'Cost - Min to Max': 'C↑',
    Name: 'N',
    Type: 'T',
  };

  const handleClear = () => {
    navigate('/library');
    setCards(undefined);
    setShowLibrarySearch(true);
  };

  const sortedCards = useMemo(
    () => librarySort(cards, librarySearchSort),
    [cards, librarySearchSort]
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
          <ResultLibraryTotal
            inCompare={inCompare}
            cards={cards}
            sortMethods={sortMethods}
            sortMethod={librarySearchSort}
            setSortMethod={changeLibrarySearchSort}
          />
          <ResultLibraryTable
            resultCards={sortedCards}
            placement={
              isDesktop || (!isDesktop && !addMode) ? 'right' : 'bottom'
            }
          />
        </>
      )}
      {isMobile && showFloatingButtons && (
        <ButtonFloat onClick={handleClear} variant="bg-[#a06060] opacity-80">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
      {isMobile && showFloatingButtons && isEditable && (
        <ButtonFloat
          onClick={toggleAddMode}
          position="middle"
          variant={
            addMode ? 'bg-[#707070] opacity-80' : 'bg-[#a0a0a0] opacity-80'
          }
        >
          <Plus width="47" height="47" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default ResultLibrary;
