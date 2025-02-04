import React from 'react';
import { DeckLibraryTableRow } from '@/components';
import { getIsEditable } from '@/utils';
import { ASCII, INVENTORY_TYPE, DECKID, ID } from '@/constants';

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
  const isEditable = getIsEditable(deck);

  return (
    <table className="border-bgSecondary dark:border-bgSecondaryDark w-full sm:border">
      <tbody>
        {sortedCards.map((card) => {
          return (
            <DeckLibraryTableRow
              key={card.c[ID]}
              handleClick={handleClick}
              card={card}
              showInfo={showInfo}
              libraryTotal={libraryTotal}
              inSearch={inSearch}
              inMissing={inMissing}
              shouldShowModal={shouldShowModal}
              isEditable={isEditable}
              deckid={deck[DECKID]}
              inventoryType={deck[INVENTORY_TYPE]}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckLibraryTable;
