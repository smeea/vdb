import React from 'react';
import { ResultModal, ResultCryptTableRow } from '@/components';
import { countDisciplines } from '@/utils';
import { useModalCardController } from '@/hooks';

const ResultCryptTable = ({ resultCards, placement, inRecommendation }) => {
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

export default ResultCryptTable;
