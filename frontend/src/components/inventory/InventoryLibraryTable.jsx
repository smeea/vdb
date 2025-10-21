import { useCallback } from "react";
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

  const handleClick = useCallback(
    (card) => {
      handleModalCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    },
    [sortedCards],
  );

  const handleClose = useCallback(() => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  }, [sortedCards]);

  const cardRows = sortedCards
    .filter((card) => playtestMode || !getIsPlaytest(card.c[ID]))
    .map((card) => (
      <InventoryLibraryTableRow
        key={card.c[ID]}
        card={card}
        compact={compact}
        newFocus={newFocus}
        forceNonEditable={inShared || inMissing}
        handleClick={handleClick}
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
              ? "h-[calc(100dvh-262px)] sm:h-[calc(100dvh-291px)] lg:h-[calc(100dvh-314px)] xl:h-[calc(100dvh-340px)]"
              : inShared
                ? "h-[calc(100dvh-160px)] sm:h-[calc(100dvh-190px)] lg:h-[calc(100dvh-200px)] xl:h-[calc(100dvh-210px)]"
                : inMissing
                  ? "h-[calc(100dvh-172px)] sm:h-[calc(100dvh-192px)] lg:h-[calc(100dvh-212px)] xl:h-[calc(100dvh-232px)]"
                  : "h-[calc(100dvh-217px)] sm:h-[calc(100dvh-237px)] lg:h-[calc(100dvh-257px)] xl:h-[calc(100dvh-277px)]"
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
          forceInventoryMode
        />
      )}
    </>
  );
};

export default InventoryLibraryTable;
