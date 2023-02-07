import React from 'react';
import { DeckCryptTableRow } from '@/components';

const DeckCryptTable = ({
  deck,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  maxDisciplines,
  cards,
  showInfo,
  cryptTotal,
  handleModalCardOpen,
  inSearch,
  inMissing,
}) => {
  const { setShowFloatingButtons } = useApp();

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card, idx) => {
          return (
            <DeckCryptTableRow
              key={card.c.Id}
              idx={idx}
              handleClick={handleModalCardOpen}
              card={card}
              deck={deck}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              nonKeyDisciplines={nonKeyDisciplines}
              maxDisciplines={maxDisciplines}
              showInfo={showInfo}
              cryptTotal={cryptTotal}
              inSearch={inSearch}
              inMissing={inMissing}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckCryptTable;
