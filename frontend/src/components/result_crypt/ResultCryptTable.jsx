import React from 'react';
import { ResultModal, ResultCryptTableRow } from 'components';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const ResultCryptTable = ({
  resultCards,
  placement,
  className,
  inRecommendation,
}) => {
  const { setShowFloatingButtons } = useApp();

  let maxDisciplines = 0;
  resultCards.map((card) => {
    const n = Object.keys(card.Disciplines).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

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
      <ResultCryptTableRow
        key={card.Id}
        card={card}
        handleClick={handleClick}
        idx={idx}
        inRecommendation={inRecommendation}
        placement={placement}
        maxDisciplines={maxDisciplines}
      />
    );
  });

  return (
    <>
      <table className={className}>
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

export default ResultCryptTable;
