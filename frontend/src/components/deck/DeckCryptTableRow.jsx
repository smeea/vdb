import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { deckCardChange, useApp, usedStore, inventoryStore, limitedStore } from '@/context';
import {
  DeckCardToggleInventoryStateTd,
  DeckCardQuantityTd,
  ResultCryptTableRowCommon,
  DeckDrawProbability,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useSwipe, useDebounce } from '@/hooks';

const DeckCryptTableRow = ({
  handleClick,
  card,
  deck,
  disciplinesSet,
  keyDisciplines,
  showInfo,
  cryptTotal,
  inSearch,
  inMissing,
  noDisciplines,
  shouldShowModal,
}) => {
  const { limitedMode, inventoryMode, isDesktop } = useApp();
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const limitedCrypt = useSnapshot(limitedStore).crypt;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const [isSwiped, setIsSwiped] = useState();
  useDebounce(() => setIsSwiped(false), 500, [isSwiped]);
  const swipeHandlers = useSwipe(
    () => {
      if (isEditable) {
        setIsSwiped('left');
        deckCardChange(deckid, card.c, card.q - 1);
      }
    },
    () => {
      if (isEditable) {
        setIsSwiped('right');
        deckCardChange(deckid, card.c, card.q + 1);
      }
    },
  );

  const inLimited = limitedCrypt[card.c.Id];
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]) ?? 0;

  const trBg = isSwiped
    ? isSwiped === 'right'
      ? 'bg-bgSuccess dark:bg-bgSuccessDark'
      : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : 'row-bg';

  return (
    <tr
      {...swipeHandlers}
      className={`h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark ${trBg}`}
    >
      {inventoryMode && deck.inventoryType && !inMissing && !inSearch && isDesktop && (
        <DeckCardToggleInventoryStateTd card={card} deck={deck} />
      )}
      <DeckCardQuantityTd
        card={card.c}
        cardChange={deckCardChange}
        deckid={deckid}
        disabledTooltip={!inventoryMode}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inMissing={inMissing}
        inventoryType={deck.inventoryType}
        isEditable={isEditable}
        q={card.q}
        softUsedMax={softUsedMax}
      />
      <ResultCryptTableRowCommon
        isBanned={limitedMode && !inLimited}
        card={card.c}
        handleClick={handleClick}
        keyDisciplines={keyDisciplines}
        disciplinesSet={disciplinesSet}
        inSearch={inSearch}
        shouldShowModal={shouldShowModal}
        noDisciplines={noDisciplines}
        inDeck
      />
      {showInfo && (
        <td className="min-w-[40px]">
          <div className="flex justify-end">
            <DeckDrawProbability cardName={card.c.Name} N={cryptTotal} n={4} k={card.q} />
          </div>
        </td>
      )}
    </tr>
  );
};

export default DeckCryptTableRow;
