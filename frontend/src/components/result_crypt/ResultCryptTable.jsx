import React from 'react';
import { ResultModal, ResultCryptTableRow } from 'components';
import { useApp } from 'context';
import { countDisciplines } from 'utils';
import { useModalCardController } from 'hooks';

const ResultCryptTable = ({
  resultCards,
  placement,
  className,
  inRecommendation,
}) => {
  const { setShowFloatingButtons } = useApp();
  const maxDisciplines = countDisciplines(resultCards);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(resultCards);

  const cardRows = resultCards.map((card, idx) => {
    return (
      <ResultCryptTableRow
        key={card.Id}
        card={card}
        handleClick={handleModalCardOpen}
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
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default ResultCryptTable;
