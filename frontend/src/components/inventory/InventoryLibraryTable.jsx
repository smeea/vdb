import { List } from "react-window";
import { InventoryLibraryTableRow, ResultModal, WindowRows } from "@/components";
import { ID, VALUE } from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";
import { getIsPlaytest, librarySort } from "@/utils";

const InventoryLibraryTable = ({
  cards,
  sortMethod,
  compact,
  withCompact,
  newFocus,
  inMissing,
  inShared,
}) => {
  const { playtestMode, setShowFloatingButtons, isDesktop } = useApp();
  const sortedCards = librarySort(cards, sortMethod);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    !isDesktop && setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  };

  const cardRows = sortedCards
    .filter((card) => playtestMode || !getIsPlaytest(card.c[ID]))
    .map((card) => (
      <InventoryLibraryTableRow
        key={card.c[ID]}
        card={card}
        compact={compact}
        newFocus={newFocus}
        forceNonEditable={inShared || inMissing}
        inMissing={inMissing}
        handleClick={handleClick}
        shouldShowModal={shouldShowModal}
      />
    ));

  return (
    <>
      {compact ? (
        <div className="flex h-[45px] border border-bgSecondary bg-bgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark">
          {cardRows[0]}
        </div>
      ) : (
        <div
          className={
            withCompact
              ? "h-[calc(100dvh-309px)] sm:h-[calc(100dvh-337px)] lg:h-[calc(100dvh-360px)] xl:h-[calc(100dvh-384px)]"
              : inShared
                ? "h-[calc(100dvh-207px)] sm:h-[calc(100dvh-236px)] lg:h-[calc(100dvh-246px)] xl:h-[calc(100dvh-256px)]"
                : inMissing
                  ? "h-[calc(100dvh-219px)] sm:h-[calc(100dvh-238px)] lg:h-[calc(100dvh-258px)] xl:h-[calc(100dvh-278px)]"
              : "h-[calc(100dvh-264px)] sm:h-[calc(100dvh-283px)] lg:h-[calc(100dvh-303px)] xl:h-[calc(100dvh-323px)]"
          }
        >
          <List
            className="border-bgSecondary sm:border dark:border-bgSecondaryDark"
            rowComponent={WindowRows}
            rowCount={cardRows.length}
            rowHeight={45}
            rowProps={{ [VALUE]: cardRows }}
          />
        </div>
      )}
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

export default InventoryLibraryTable;
