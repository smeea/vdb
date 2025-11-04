import { ResultLibraryTableRow, ResultModal } from "@/components";
import { ID } from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";

const ResultLibraryTable = ({ resultCards, inLimited }) => {
  const { setShowFloatingButtons, isDesktop } = useApp();
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(resultCards);

  const handleClick = (card) => {
      handleModalCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    }

  const handleClose = () => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  }

  return (
    <>
      <table className="w-full border-bgSecondary sm:border dark:border-bgSecondaryDark">
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
