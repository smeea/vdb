import React, { useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { twMerge } from 'tailwind-merge';
import { WindowRows, ResultModal, InventoryLibraryTableRow } from '@/components';
import { getIsPlaytest, librarySort } from '@/utils';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';
import { ID } from '@/constants';

const InventoryLibraryTable = ({ cards, sortMethod, compact, withCompact, newFocus, inShared }) => {
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

  const cardRows = useMemo(() => {
    return sortedCards
      .filter((card) => playtestMode || !getIsPlaytest(card.c[ID]))
      .map((card) => {
        return (
          <InventoryLibraryTableRow
            key={card.c[ID]}
            card={card}
            compact={compact}
            newFocus={newFocus}
            inShared={inShared}
            handleClick={handleClick}
          />
        );
      });
  }, [sortedCards]);

  return (
    <>
      {compact ? (
        <div className="border-bgSecondary bg-bgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark flex h-[45px] border">
          {cardRows[0]}
        </div>
      ) : (
        <div
          className={twMerge(
            !inShared && withCompact
              ? 'h-[calc(100dvh-262px)] sm:h-[calc(100dvh-291px)] lg:h-[calc(100dvh-314px)] xl:h-[calc(100dvh-340px)]'
              : 'h-[calc(100dvh-217px)] sm:h-[calc(100dvh-237px)] lg:h-[calc(100dvh-257px)] xl:h-[calc(100dvh-277px)]',
            inShared &&
              'h-[calc(100dvh-160px)] sm:h-[calc(100dvh-190px)] lg:h-[calc(100dvh-200px)] xl:h-[calc(100dvh-210px)]',
          )}
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
          handleClose={handleClose}
          forceInventoryMode
        />
      )}
    </>
  );
};

export default InventoryLibraryTable;
