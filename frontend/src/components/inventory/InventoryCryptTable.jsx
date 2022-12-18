import React from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ResultModal, InventoryCryptTableRow } from 'components';
import { cryptSort } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const InventoryCryptTable = ({
  cards,
  placement,
  sortMethod,
  compact,
  withCompact,
  newFocus,
  inShared,
}) => {
  const { setShowFloatingButtons } = useApp();
  const sortedCards = cryptSort(cards, sortMethod);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const cardRows = sortedCards.map((card) => {
    return (
      <InventoryCryptTableRow
        key={card.c.Id}
        card={card}
        placement={placement}
        compact={compact}
        newFocus={newFocus}
        inShared={inShared}
        handleClick={handleModalCardOpen}
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
        <div className="inventory-crypt-table bordered result-odd compact flex">
          {cardRows[0]}
        </div>
      ) : (
        <div
          className={`inventory-container-crypt${
            withCompact ? '-with-compact' : ''
          }`}
        >
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                className="inventory-crypt-table"
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
