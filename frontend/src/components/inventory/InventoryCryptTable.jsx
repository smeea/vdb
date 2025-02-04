import React, { useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { twMerge } from 'tailwind-merge';
import { WindowRows, ResultModal, InventoryCryptTableRow } from '@/components';
import { getIsPlaytest } from '@/utils';
import { useApp } from '@/context';
import { useCryptSortWithTimer, useModalCardController } from '@/hooks';
import { ID } from '@/constants';

const InventoryCryptTable = ({ cards, sortMethod, compact, withCompact, newFocus, inShared }) => {
  const { playtestMode, setShowFloatingButtons, isDesktop } = useApp();
  const sortedCards = useCryptSortWithTimer(cards, sortMethod);

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
          <InventoryCryptTableRow
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
              ? 'h-[calc(100dvh-216px)] sm:h-[calc(100dvh-245px)] lg:h-[calc(100dvh-268px)] xl:h-[calc(100dvh-294px)]'
              : 'h-[calc(100dvh-172px)] sm:h-[calc(100dvh-192px)] lg:h-[calc(100dvh-212px)] xl:h-[calc(100dvh-232px)]',
            inShared &&
              'h-[calc(100dvh-114px)] sm:h-[calc(100dvh-144px)] lg:h-[calc(100dvh-154px)] xl:h-[calc(100dvh-164px)]',
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

export default InventoryCryptTable;
