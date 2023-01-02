import React, { useState, useMemo } from 'react';
import { DeckLibraryTableRow, DeckDrawProbabilityModal } from 'components';
import { useApp } from 'context';

const DeckLibraryTable = ({
  deck,
  cards,
  placement,
  showInfo,
  libraryTotal,
  handleModalCardOpen,
  inSearch,
  inMissing,
  isModalOpen,
}) => {
  const { isMobile, isDesktop, setShowFloatingButtons } = useApp();
  const [modalDraw, setModalDraw] = useState();

  cards.sort((a, b) => {
    if (a.c['ASCII Name'] < b.c['ASCII Name']) {
      return -1;
    }
    if (a.c['ASCII Name'] > b.c['ASCII Name']) {
      return 1;
    }
  });

  const disableOverlay = useMemo(
    () => isMobile || (!isDesktop && isModalOpen),
    [isMobile, isDesktop, isModalOpen]
  );

  const cardRows = cards.map((card, idx) => {
    return (
      <DeckLibraryTableRow
        key={card.c.Id}
        idx={idx}
        disableOverlay={disableOverlay}
        placement={placement}
        handleClick={handleModalCardOpen}
        card={card}
        deck={deck}
        showInfo={showInfo}
        libraryTotal={libraryTotal}
        inSearch={inSearch}
        inMissing={inMissing}
        setModalDraw={setModalDraw}
      />
    );
  });

  return (
    <>
      <table className="deck-library-table border-bgSecondary dark:border-bgSecondaryDark sm:border">
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

export default DeckLibraryTable;
