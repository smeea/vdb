import React from 'react';
import { DeckProxyLibraryTableRow } from 'components';
import { useApp } from 'context';

const DeckProxyLibraryTable = ({
  inventoryType,
  handleModalCardOpen,
  cards,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  placement,
}) => {
  // const { setShowFloatingButtons } = useApp();

  const cardRows = cards.map((card, idx) => {
    return (
      <DeckProxyLibraryTableRow
        inventoryType={inventoryType}
        key={card.Id}
        card={card}
        idx={idx}
        handleClick={handleModalCardOpen}
        proxySelected={proxySelected}
        handleProxySelector={handleProxySelector}
        handleProxyCounter={handleProxyCounter}
        handleSetSelector={handleSetSelector}
        placement={placement}
      />
    );
  });

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>{cardRows}</tbody>
    </table>
  );
};

export default DeckProxyLibraryTable;
