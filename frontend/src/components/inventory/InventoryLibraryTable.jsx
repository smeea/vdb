import React from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ResultModal, InventoryLibraryTableRow } from 'components';
import { librarySort } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const InventoryLibraryTable = ({
  cards,
  placement,
  sortMethod,
  compact,
  withCompact,
  newFocus,
  inShared,
}) => {
  const { setShowFloatingButtons } = useApp();
  const sortedCards = librarySort(cards, sortMethod);

  // Modal Card Controller
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
      <InventoryLibraryTableRow
        key={card.c.Id}
        card={card}
        placement={placement}
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
      className={`bordered flex ${index % 2 ? 'result-even' : 'result-odd'}`}
    >
      {cardRows[index]}
    </div>
  );

  return (
    <>
      {compact ? (
        <div className="inventory-library-table bordered result-odd compact flex">
          {cardRows[0]}
        </div>
      ) : (
        <div
          className={`inventory-container-library${
            withCompact ? '-with-compact' : ''
          }`}
        >
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                className="inventory-library-table"
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

export default InventoryLibraryTable;
