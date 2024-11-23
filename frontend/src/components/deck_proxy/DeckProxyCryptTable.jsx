import React from 'react';
import { DeckProxyCryptTableRow } from '@/components';
import { getKeyDisciplines } from '@/utils';
import { ID } from '@/constants';

const DeckProxyCryptTable = ({
  handleClick,
  inventoryType,
  cards,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
}) => {
  const { disciplinesSet, keyDisciplines } = getKeyDisciplines(cards);

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card) => {
          return (
            <DeckProxyCryptTableRow
              key={card.c[ID]}
              inventoryType={inventoryType}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              card={card}
              handleClick={handleClick}
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

export default DeckProxyCryptTable;
