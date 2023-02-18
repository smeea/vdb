import React from 'react';
import { ResultModal, ResultCryptTableRow } from '@/components';
import { useModalCardController } from '@/hooks';

const ResultCryptTable = ({ resultCards, inRecommendation }) => {
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(resultCards);

  return (
    <>
      <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
        <tbody>
          {resultCards.map((card, idx) => {
            return (
              <ResultCryptTableRow
                key={card.Id}
                card={card}
                handleClick={handleModalCardOpen}
                idx={idx}
                inRecommendation={inRecommendation}
              />
            );
          })}
        </tbody>
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
