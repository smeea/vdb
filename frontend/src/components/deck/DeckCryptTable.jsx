import React, { useState, useMemo } from 'react';
import { DeckCryptTableRow, DeckDrawProbabilityModal } from 'components';
import { useApp } from 'context';
import { countDisciplines } from 'utils';

const DeckCryptTable = ({
  deck,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  cards,
  placement,
  showInfo,
  cryptTotal,
  handleModalCardOpen,
  inSearch,
  inMissing,
  isModalOpen,
}) => {
  const { isMobile, isDesktop, setShowFloatingButtons } = useApp();
  const [modalDraw, setModalDraw] = useState();
  const maxDisciplines = countDisciplines(cards);

  const disableOverlay = useMemo(
    () => isMobile || (!isDesktop && isModalOpen),
    [isMobile, isDesktop, isModalOpen]
  );

  const cardRows = cards.map((card, idx) => {
    return (
      <DeckCryptTableRow
        key={card.c.Id}
        idx={idx}
        disableOverlay={disableOverlay}
        placement={placement}
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
        setModalDraw={setModalDraw}
      />
    );
  });

  return (
    <>
      <table className="deck-crypt-table border-bgSecondary dark:border-bgSecondaryDark sm:border">
        <tbody>{cardRows}</tbody>
      </table>
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </>
  );
};

export default DeckCryptTable;
