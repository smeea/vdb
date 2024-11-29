import React from 'react';
import { ResultTable, ResultLibraryTotal, ErrorMessage } from '@/components';
import { useApp } from '@/context';
import { LIBRARY, CLAN_DISCIPLINE, COST_MAX_MIN, COST_MIN_MAX, NAME, TYPE } from '@/constants';

const ResultLibrary = ({ cards, inCompare }) => {
  const { librarySearchSort, changeLibrarySearchSort } = useApp();

  const sortMethods = {
    [CLAN_DISCIPLINE]: 'C/D',
    [COST_MAX_MIN]: 'C↓',
    [COST_MIN_MAX]: 'C↑',
    [NAME]: 'N',
    [TYPE]: 'T',
  };

  return (
    <>
      {cards === null || cards.length === 0 ? (
        <ErrorMessage sticky>
          {cards === null ? 'CONNECTION PROBLEM' : 'NO CARDS FOUND'}
        </ErrorMessage>
      ) : (
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
    </>
  );
};

export default ResultLibrary;
