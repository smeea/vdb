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
import { ID, NAME, SOFT, HARD, CRYPT } from '@/constants';

const DeckCryptTableRow = ({
  handleClick,
  card,
  disciplinesSet,
  keyDisciplines,
  showInfo,
  cryptTotal,
  inSearch,
  inMissing,
  noDisciplines,
  shouldShowModal,
  inSide,

  isEditable,
  deckid,
  inventoryType,
}) => {
  const { limitedMode, inventoryMode, isDesktop } = useApp();
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const limitedCrypt = useSnapshot(limitedStore)[CRYPT];

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

  const inLimited = limitedCrypt[card.c[ID]];
  const inInventory = inventoryCrypt[card.c[ID]]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt[SOFT][card.c[ID]]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.c[ID]]) ?? 0;

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        'border-bgSecondary dark:border-bgSecondaryDark h-[38px] border-y',
        getSwipedBg(isSwiped),
      )}
    >
      {inventoryMode && inventoryType && !inMissing && !inSearch && isDesktop && (
        <DeckCardToggleInventoryStateTd
          isEditable={isEditable}
          card={card}
          deckid={deckid}
          inventoryType={inventoryType}
        />
      )}
      <DeckCardQuantityTd
        card={card.c}
        cardChange={deckCardChange}
        deckid={deckid}
        disabledTooltip={!inventoryMode}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inMissing={inMissing}
        inventoryType={inventoryType}
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
            <DeckDrawProbability cardName={card.c[NAME]} N={cryptTotal} n={4} k={card.q} />
          )}
        </td>
      )}
    </tr>
  );
};

export default DeckCryptTableRow;
