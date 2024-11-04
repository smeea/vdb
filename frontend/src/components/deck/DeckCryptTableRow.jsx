import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import { deckCardChange, useApp, usedStore, inventoryStore, limitedStore } from '@/context';
import {
  DeckCardToggleInventoryStateTd,
  DeckCardQuantityTd,
  ResultCryptTableRowCommon,
  DeckDrawProbability,
} from '@/components';
import { useSwipe } from '@/hooks';
import { getSwipedBg, getSoftMax, getHardTotal } from '@/utils';
import { INVENTORY_TYPE, SOFT, HARD, CRYPT } from '@/utils/constants';

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
  inSide,
}) => {
  const { limitedMode, inventoryMode, isDesktop } = useApp();
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const limitedCrypt = useSnapshot(limitedStore)[CRYPT];
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

  const inLimited = limitedCrypt[card.c.Id];
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt[SOFT][card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.c.Id]) ?? 0;

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        'h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark',
        getSwipedBg(isSwiped),
      )}
    >
      {inventoryMode && deck[INVENTORY_TYPE] && !inMissing && !inSearch && isDesktop && (
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
        inventoryType={deck[INVENTORY_TYPE]}
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
        <td className="min-w-[45px] text-right sm:p-1">
          {!inSide && (
            <DeckDrawProbability cardName={card.c.Name} N={cryptTotal} n={4} k={card.q} />
          )}
        </td>
      )}
    </tr>
  );
};

export default DeckCryptTableRow;
