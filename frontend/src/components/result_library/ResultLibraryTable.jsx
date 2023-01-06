import React from 'react';
import { ResultModal, ResultLibraryTableRow } from 'components';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const ResultLibraryTable = ({ resultCards, placement }) => {
  const { setShowFloatingButtons } = useApp();

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(resultCards);

  const cardRows = resultCards.map((card, idx) => {
    return (
      <ResultLibraryTableRow
        key={card.Id}
        card={card}
        handleClick={handleModalCardOpen}
        idx={idx}
        placement={placement}
      />
    );
  });

  return (
    <>
      <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
        <tbody>{cardRows}</tbody>
      </table>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default ResultLibraryTable;
