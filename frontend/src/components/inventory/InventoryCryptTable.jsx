import React from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ResultModal, InventoryCryptTableRow } from '@/components';
import { cryptSort } from '@/utils';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';

const InventoryCryptTable = ({
  cards,
  sortMethod,
  compact,
  withCompact,
  newFocus,
  inShared,
}) => {
  const { setShowFloatingButtons } = useApp();
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
    setShowFloatingButtons(false);
  };

  const cardRows = sortedCards.map((card) => {
    return (
      <InventoryCryptTableRow
        key={card.c.Id}
        card={card}
        compact={compact}
        newFocus={newFocus}
        inShared={inShared}
        handleClick={handleClick}
      />
    );
  });

  const Rows = ({ index, style }) => (
    <div
      style={style}
      className={`flex border-b border-bgSecondary dark:border-bgSecondaryDark ${
        index % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      {cardRows[index]}
    </div>
  );

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
              ? 'h-[calc(100vh-209px)] sm:h-[calc(100vh-249px)] lg:h-[calc(100vh-262px)] xl:h-[calc(100vh-284px)]'
              : 'h-[calc(100vh-164px)] sm:h-[calc(100vh-195px)] lg:h-[calc(100vh-208px)] xl:h-[calc(100vh-230px)]'
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
              >
                {Rows}
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
