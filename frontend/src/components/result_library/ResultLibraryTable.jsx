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

  const handleCloseModal = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const cardRows = resultCards.map((card, idx) => {
    return (
      <ResultLibraryTableRow
        key={card.Id}
        card={card}
        handleClick={handleClick}
        idx={idx}
        placement={placement}
      />
    );
  });

  return (
    <>
      <table className="search-library-table">
        <tbody>{cardRows}</tbody>
      </table>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ResultLibraryTable;
