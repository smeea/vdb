import React from 'react';
import { useSnapshot } from 'valtio';
import { useSearchParams } from 'react-router';
import {
  ResultTable,
  ButtonFloatAdd,
  ButtonFloatClose,
  ResultLibraryTotal,
  ErrorMessage,
} from '@/components';
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

const ResultLibrary = ({ cards, inCompare }) => {
  const { isMobile, librarySearchSort, changeLibrarySearchSort, showFloatingButtons } = useApp();
  const [, setSearchParams] = useSearchParams();
  const deck = useSnapshot(deckStore)[DECK];
  const isEditable = getIsEditable(deck);
  const handleClear = () => setSearchParams();

  const sortMethods = {
    [CLAN_DISCIPLINE]: 'C/D',
    [COST_MAX_MIN]: 'C↓',
    [COST_MIN_MAX]: 'C↑',
    [NAME]: 'N',
    [TYPE]: 'T',
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
