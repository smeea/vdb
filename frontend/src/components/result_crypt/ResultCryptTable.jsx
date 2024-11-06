import React from 'react';
import { ResultModal, ResultCryptTableRow } from '@/components';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';

const ResultCryptTable = ({ resultCards, inRecommendation, inLimited }) => {
  const { setShowFloatingButtons } = useApp();
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(resultCards);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <>
      <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
        <tbody>
          {resultCards.map((card) => {
            return (
              <ResultCryptTableRow
                key={card[ID]}
                card={card}
                handleClick={handleClick}
                inRecommendation={inRecommendation}
                inLimited={inLimited}
                shouldShowModal={shouldShowModal}
              />
            );
          })}
        </tbody>
      </table>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default ResultCryptTable;
