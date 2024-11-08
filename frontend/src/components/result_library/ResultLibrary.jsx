import React from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import { ButtonFloatAdd, ButtonFloatClose, ResultLibraryTotal, ErrorMessage } from '@/components';
import { getIsEditable } from '@/utils';
import { useApp, deckStore } from '@/context';
import {
  LIBRARY,
  DECK,
  CLAN_DISCIPLINE,
  COST_MAX_MIN,
  COST_MIN_MAX,
  NAME,
  TYPE,
} from '@/constants';

const ResultLibrary = ({ cards, setCards, inCompare }) => {
  const {
    setShowLibrarySearch,
    isMobile,
    librarySearchSort,
    changeLibrarySearchSort,
    showFloatingButtons,
  } = useApp();
  const navigate = useNavigate();
  const deck = useSnapshot(deckStore)[DECK];
  const isEditable = getIsEditable(deck);

  const sortMethods = {
    [CLAN_DISCIPLINE]: 'C/D',
    [COST_MAX_MIN]: 'C↓',
    [COST_MIN_MAX]: 'C↑',
    [NAME]: 'N',
    [TYPE]: 'T',
  };

  const handleClear = () => {
    navigate('/library');
    setCards(undefined);
    setShowLibrarySearch(true);
  };

  return (
    <>
      {!isMobile && (cards === null || cards.length === 0) && (
        <ErrorMessage sticky>
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
          <ResultTable cards={cards} target={LIBRARY} />
        </>
      )}
      {isMobile && showFloatingButtons && <ButtonFloatClose handleClose={handleClear} />}
      {isMobile && isEditable && <ButtonFloatAdd />}
    </>
  );
};

export default ResultLibrary;
