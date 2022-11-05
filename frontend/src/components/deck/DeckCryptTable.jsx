import React, { useState, useMemo } from 'react';
import { DeckCryptTableRow, DeckDrawProbabilityModal } from 'components';
import { useApp } from 'context';

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
  const [modalDraw, setModalDraw] = useState(undefined);

  let maxDisciplines = 0;
  cards.map((card) => {
    const n = Object.keys(card.c.Disciplines).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

  const disableOverlay = useMemo(
    () => isMobile || (!isDesktop && isModalOpen),
    [isMobile, isDesktop, isModalOpen]
  );

  const handleClick = (idx) => {
    handleModalCardOpen(idx);
    setShowFloatingButtons(false);
  };

  const cardRows = cards.map((card, idx) => {
    return (
      <DeckCryptTableRow
        key={idx}
        idx={idx}
        disableOverlay={disableOverlay}
        placement={placement}
        handleClick={handleClick}
        card={card}
        deck={deck}
        disciplinesSet={disciplinesSet}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
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
      <table className="deck-crypt-table">
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
