import React, { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import X from '@/assets/images/icons/x.svg';
import Plus from '@/assets/images/icons/plus.svg';
import {
  ButtonFloat,
  ResultLibraryTable,
  ResultLibraryTotal,
  ErrorMessage,
} from '@/components';
import { librarySort } from '@/utils';
import { useApp, deckStore } from '@/context';

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

  const table = useMemo(() => {
    const sortedCards = librarySort(cards, librarySearchSort);

    return (
      <ResultLibraryTable
        resultCards={sortedCards}
        placement={isDesktop || (!isDesktop && !addMode) ? 'right' : 'bottom'}
      />
    );
  }, [cards, librarySearchSort]);

  return (
    <>
      {!isMobile && (cards === null || cards.length === 0) && (
        <ErrorMessage>
          {cards === null ? 'CONNECTION PROBLEM' : 'NO CARDS FOUND'}
        </ErrorMessage>
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
          {table}
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

export default ResultLibrary;
