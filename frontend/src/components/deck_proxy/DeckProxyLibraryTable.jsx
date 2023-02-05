import React from 'react';
import { DeckProxyLibraryTableRow } from '@/components';

const DeckProxyLibraryTable = ({
  inventoryType,
  handleModalCardOpen,
  cards,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
}) => {
  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card, idx) => {
          return (
            <DeckProxyLibraryTableRow
              key={card.c.Id}
              inventoryType={inventoryType}
              card={card}
              idx={idx}
              handleClick={handleModalCardOpen}
              proxySelected={proxySelected}
              handleProxySelector={handleProxySelector}
              handleProxyCounter={handleProxyCounter}
              handleSetSelector={handleSetSelector}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckProxyLibraryTable;
