import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { WindowRows, ResultModal, InventoryCryptTableRow } from '@/components';
import { getIsPlaytest, cryptSortWithTimer } from '@/utils';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';
import { ID } from '@/constants';

const InventoryCryptTable = ({ cards, sortMethod, compact, withCompact, newFocus, inShared }) => {
  const { playtestMode, setShowFloatingButtons } = useApp();
  const sortedCards = cryptSortWithTimer(cards, sortMethod);

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
        <div className="flex h-[45px] border border-bgSecondary bg-bgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark">
          {cardRows[0]}
        </div>
      ) : (
        <div
          className={
            withCompact
              ? 'h-[calc(100dvh-206px)] sm:h-[calc(100dvh-245px)] lg:h-[calc(100dvh-261px)] xl:h-[calc(100dvh-288px)]'
              : 'h-[calc(100dvh-159px)] sm:h-[calc(100dvh-192px)] lg:h-[calc(100dvh-204px)] xl:h-[calc(100dvh-225px)]'
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

export default InventoryCryptTable;
