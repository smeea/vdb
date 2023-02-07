import React from 'react';
import { DeckLibraryTableRow } from '@/components';

const DeckLibraryTable = ({
  deck,
  cards,
  showInfo,
  libraryTotal,
  handleClick,
  inSearch,
  inMissing,
}) => {
  cards.sort((a, b) => {
    if (a.c['ASCII Name'] < b.c['ASCII Name']) {
      return -1;
    }
    if (a.c['ASCII Name'] > b.c['ASCII Name']) {
      return 1;
    }
  });

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card, idx) => {
          return (
            <DeckLibraryTableRow
              key={card.c.Id}
              idx={idx}
              handleClick={handleClick}
              card={card}
              deck={deck}
              showInfo={showInfo}
              libraryTotal={libraryTotal}
              inSearch={inSearch}
              inMissing={inMissing}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckLibraryTable;
