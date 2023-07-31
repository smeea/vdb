import React from 'react';
import { DeckCryptTableRow } from '@/components';

const DeckCryptTable = ({
  deck,
  disciplinesSet,
  keyDisciplines,
  cards,
  showInfo,
  cryptTotal,
  handleClick,
  inSearch,
  inMissing,
  shouldShowModal,
}) => {
  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card, idx) => {
          return (
            <DeckCryptTableRow
              key={card.c.Id}
              idx={idx}
              handleClick={handleClick}
              card={card}
              deck={deck}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              showInfo={showInfo}
              cryptTotal={cryptTotal}
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

export default DeckCryptTable;
