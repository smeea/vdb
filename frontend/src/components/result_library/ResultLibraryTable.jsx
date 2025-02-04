import React, { useCallback } from 'react';
import { ResultModal, ResultLibraryTableRow } from '@/components';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';
import { ID } from '@/constants';

const ResultLibraryTable = ({ resultCards, inLimited }) => {
  const { setShowFloatingButtons } = useApp();
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(resultCards);

  const handleClick = useCallback(
    (card) => {
      handleModalCardOpen(card);
      setShowFloatingButtons(false);
    },
    [resultCards],
  );

  const handleClose = useCallback(() => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  }, [resultCards]);

  return (
    <>
      <table className="border-bgSecondary dark:border-bgSecondaryDark w-full sm:border">
        <tbody>
          {resultCards.map((card) => {
            return (
              <ResultLibraryTableRow
                key={card[ID]}
                card={card}
                handleClick={handleClick}
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

export default ResultLibraryTable;
