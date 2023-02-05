import React from 'react';
import { DiffCryptTableRow } from '@/components';
import { useApp } from '@/context';

const DiffCryptTable = ({
  cardChange,
  deckid,
  cards,
  cardsFrom,
  cardsTo,
  isEditable,
  showInfo,
  cryptTotal,
  handleModalCardOpen,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  maxDisciplines,
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
            <DiffCryptTableRow
              cardChange={cardChange}
              deckid={deckid}
              cardsFrom={cardsFrom}
              cardsTo={cardsTo}
              isEditable={isEditable}
              showInfo={showInfo}
              key={card.c.Id}
              card={card}
              idx={idx}
              handleClick={handleClick}
              cryptTotal={cryptTotal}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              nonKeyDisciplines={nonKeyDisciplines}
              maxDisciplines={maxDisciplines}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DiffCryptTable;
