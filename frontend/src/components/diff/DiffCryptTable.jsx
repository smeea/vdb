import React from 'react';
import { DiffCryptTableRow } from '@/components';
import { useApp } from '@/context';
import { useKeyDisciplines } from '@/hooks';

const DiffCryptTable = ({
  cardChange,
  deckid,
  cards,
  cardsFrom,
  cardsTo,
  isEditable,
  placement,
  showInfo,
  cryptTotal,
  handleModalCardOpen,
  inReview,
}) => {
  const { setShowFloatingButtons } = useApp();
  const { disciplinesSet, keyDisciplines, nonKeyDisciplines, maxDisciplines } =
    useKeyDisciplines(cards);

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
              placement={placement}
              showInfo={showInfo}
              inReview={inReview}
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
