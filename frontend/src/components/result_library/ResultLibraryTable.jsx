import React from 'react';
import { ResultModal, ResultLibraryTableRow } from '@/components';
import { useModalCardController } from '@/hooks';

const ResultLibraryTable = ({ resultCards, inLimited }) => {
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
              <ResultLibraryTableRow
                key={card.Id}
                card={card}
                handleClick={handleModalCardOpen}
                idx={idx}
                inLimited={inLimited}
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

export default ResultLibraryTable;
