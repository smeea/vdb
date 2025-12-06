import { List } from "react-window";
import { InventoryCryptTableRow, ResultModal, WindowRows } from "@/components";
import { ID, VALUE } from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";
import { cryptSort, getIsPlaytest } from "@/utils";

const InventoryCryptTable = ({
  cards,
  sortMethod,
  compact,
  withCompact,
  newFocus,
  inMissing,
  inShared,
}) => {
  const { playtestMode, setShowFloatingButtons, isDesktop } = useApp();
  const sortedCards = cryptSort(cards, sortMethod);

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
      <InventoryCryptTableRow
        key={card.c[ID]}
        card={card}
        compact={compact}
        newFocus={newFocus}
        forceNonEditable={inShared || inMissing}
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
              ? "h-[calc(100dvh-216px)] sm:h-[calc(100dvh-245px)] lg:h-[calc(100dvh-268px)] xl:h-[calc(100dvh-294px)]"
              : inShared
                ? "h-[calc(100dvh-114px)] sm:h-[calc(100dvh-144px)] lg:h-[calc(100dvh-154px)] xl:h-[calc(100dvh-164px)]"
                : "h-[calc(100dvh-172px)] sm:h-[calc(100dvh-192px)] lg:h-[calc(100dvh-212px)] xl:h-[calc(100dvh-232px)]"
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

export default InventoryCryptTable;
