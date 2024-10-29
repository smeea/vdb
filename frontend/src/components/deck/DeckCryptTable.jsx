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
  noDisciplines,
  shouldShowModal,
  inSide,
}) => {
  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card) => {
          return (
            <DeckCryptTableRow
              key={card.c.Id}
              handleClick={handleClick}
              card={card}
              deck={deck}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              showInfo={showInfo}
              cryptTotal={cryptTotal}
              inSearch={inSearch}
              noDisciplines={noDisciplines}
              inMissing={inMissing}
              shouldShowModal={shouldShowModal}
              inSide={inSide}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckCryptTable;
