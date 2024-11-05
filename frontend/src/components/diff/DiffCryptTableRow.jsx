import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  DeckDrawProbability,
  DiffQuantityDiffCard,
  ResultCryptTableRowCommon,
} from '@/components';
import { getSwipedBg, getSoftMax, getHardTotal } from '@/utils';
import { useApp, usedStore, inventoryStore, deckStore, deckCardChange } from '@/context';
import { useSwipe } from '@/hooks';
import { INVENTORY_TYPE, SOFT, HARD, CRYPT, DECKS } from '@/constants';

const DiffCryptTableRow = ({
  cardChange,
  deckid,
  cardsFrom,
  cardsTo,
  isEditable,
  showInfo,
  cryptTotal,
  card,
  handleClick,
  disciplinesSet,
  keyDisciplines,
}) => {
  const { inventoryMode } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const softUsedMax = getSoftMax(usedCrypt[SOFT][card.Id]);
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.Id]);
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const qFrom = cardsFrom[card.c.Id]?.q ?? 0;
  const qTo = cardsTo[card.c.Id]?.q ?? 0;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        'h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark',
        getSwipedBg(isSwiped),
      )}
    >
      <DeckCardQuantityTd
        card={card.c}
        cardChange={cardChange ?? deckCardChange}
        deckid={cardChange ? null : deckid}
        disabledTooltip={!inventoryMode}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inventoryType={decks?.[deckid]?.[INVENTORY_TYPE]}
        isEditable={isEditable}
        q={qFrom}
        softUsedMax={softUsedMax}
      />
      <DiffQuantityDiffCard qFrom={qFrom} qTo={qTo} />
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        keyDisciplines={keyDisciplines}
        disciplinesSet={disciplinesSet}
        inDeck
      />
      {showInfo && (
        <td className="min-w-[40px] text-right sm:p-1">
          <DeckDrawProbability cardName={card.c.Name} N={cryptTotal} n={4} k={card.q} />
        </td>
      )}
    </tr>
  );
};

export default DiffCryptTableRow;
