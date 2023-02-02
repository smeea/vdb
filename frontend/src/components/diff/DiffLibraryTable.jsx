import React from 'react';
import { DiffLibraryTableRow } from '@/components';
import { useApp } from '@/context';

const DiffLibraryTable = ({
  cardChange,
  deckid,
  cards,
  cardsFrom,
  cardsTo,
  isEditable,
  placement,
  showInfo,
  libraryTotal,
  handleModalCardOpen,
}) => {
  const { setShowFloatingButtons } = useApp();

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card, idx) => {
          return (
            <DiffLibraryTableRow
              cardChange={cardChange}
              deckid={deckid}
              cardsFrom={cardsFrom}
              cardsTo={cardsTo}
              isEditable={isEditable}
              placement={placement}
              showInfo={showInfo}
              libraryTotal={libraryTotal}
              key={card.c.Id}
              card={card}
              idx={idx}
              handleClick={handleClick}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DiffLibraryTable;
