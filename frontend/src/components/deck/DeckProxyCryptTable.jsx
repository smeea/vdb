import React from 'react';
import { DeckProxyCryptTableRow } from 'components';
import { useKeyDisciplines } from 'hooks';

const DeckProxyCryptTable = ({
  handleModalCardOpen,
  inventoryType,
  cards,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  placement,
}) => {
  // const { setShowFloatingButtons } = useApp();
  const { disciplinesSet, keyDisciplines, nonKeyDisciplines, maxDisciplines } =
    useKeyDisciplines(cards);

  const cardRows = cards.map((card, idx) => {
    return (
      <DeckProxyCryptTableRow
        key={card.c.Id}
        inventoryType={inventoryType}
        disciplinesSet={disciplinesSet}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        maxDisciplines={maxDisciplines}
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
    <>
      <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
        <tbody>{cardRows}</tbody>
      </table>
    </>
  );
};

export default DeckProxyCryptTable;
