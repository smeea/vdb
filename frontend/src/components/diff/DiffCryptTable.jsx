import React from 'react';
import { DiffCryptTableRow } from '@/components';
import { ID } from '@/constants';

const DiffCryptTable = ({
  cardChange,
  deckid,
  cards,
  cardsFrom,
  cardsTo,
  isEditable,
  showInfo,
  cryptTotal,
  handleClick,
  disciplinesSet,
  keyDisciplines,
}) => {
  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card) => {
          return (
            <DiffCryptTableRow
              cardChange={cardChange}
              deckid={deckid}
              cardsFrom={cardsFrom}
              cardsTo={cardsTo}
              isEditable={isEditable}
              showInfo={showInfo}
              key={card.c[ID]}
              card={card}
              handleClick={handleClick}
              cryptTotal={cryptTotal}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DiffCryptTable;
