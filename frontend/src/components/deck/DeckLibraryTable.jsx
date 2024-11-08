import React from 'react';
import { ASCII, ID } from '@/constants';
import { DeckLibraryTableRow } from '@/components';

const DeckLibraryTable = ({
  deck,
  cards,
  showInfo,
  libraryTotal,
  handleClick,
  inSearch,
  inMissing,
  shouldShowModal,
}) => {
  const sortedCards = cards.toSorted((a, b) => a.c[ASCII] - b.c[ASCII]);

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {sortedCards.map((card) => {
          return (
            <DeckLibraryTableRow
              key={card.c[ID]}
              handleClick={handleClick}
              card={card}
              deck={deck}
              showInfo={showInfo}
              libraryTotal={libraryTotal}
              inSearch={inSearch}
              inMissing={inMissing}
              shouldShowModal={shouldShowModal}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckLibraryTable;
