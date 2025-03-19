import { useCallback } from 'react';
import { ResultLibraryTableRow, ResultModal } from '@/components';
import { ID } from '@/constants';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';

const ResultLibraryTable = ({ resultCards, inLimited }) => {
  const { setShowFloatingButtons, isDesktop } = useApp();
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
      !isDesktop && setShowFloatingButtons(false);
    },
    [resultCards],
  );

  const handleClose = useCallback(() => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
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
