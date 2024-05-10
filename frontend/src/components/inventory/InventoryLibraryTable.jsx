import React from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { WindowRows, ResultModal, InventoryLibraryTableRow } from '@/components';
import { librarySort } from '@/utils';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';

const InventoryLibraryTable = ({ cards, sortMethod, compact, withCompact, newFocus, inShared }) => {
  const { playtestMode, setShowFloatingButtons } = useApp();
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
    setShowFloatingButtons(false);
  };

  const cardRows = sortedCards
    .filter((card) => playtestMode || card.c.Id < 110000)
    .map((card) => {
      return (
        <InventoryLibraryTableRow
          key={card.c.Id}
          card={card}
          compact={compact}
          newFocus={newFocus}
          inShared={inShared}
          handleClick={handleClick}
        />
      );
    });

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
              ? 'h-[calc(100vh-251px)] sm:h-[calc(100vh-291px)] lg:h-[calc(100vh-304px)] xl:h-[calc(100vh-326px)]'
              : 'h-[calc(100vh-206px)] sm:h-[calc(100vh-237px)] lg:h-[calc(100vh-250px)] xl:h-[calc(100vh-272px)]'
          }
        >
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                className="border-bgSecondary dark:border-bgSecondaryDark sm:border"
                height={height}
                width={width}
                itemCount={cardRows.length}
                itemSize={45}
                itemData={cardRows}
              >
                {WindowRows}
              </FixedSizeList>
            )}
          </AutoSizer>
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
          forceInventoryMode
        />
      )}
    </>
  );
};

export default InventoryLibraryTable;
