import React from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  DeckDrawProbability,
  DiffQuantityDiffCard,
  ResultLibraryTableRowCommon,
} from '@/components';
import { getHardTotal, getSoftMax } from '@/utils';
import { useApp, deckStore, usedStore, inventoryStore, deckCardChange } from '@/context';
import { useSwipe } from '@/hooks';
import { DECKS, LIBRARY } from '@/utils/constants';

const DiffLibraryTableRow = ({
  cardChange,
  deckid,
  cardsFrom,
  cardsTo,
  isEditable,
  showInfo,
  libraryTotal,
  card,
  handleClick,
}) => {
  const { inventoryMode } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]);
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);
  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const qFrom = cardsFrom[card.c.Id]?.q ?? 0;
  const qTo = cardsTo[card.c.Id]?.q ?? 0;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

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
      <DeckCardQuantityTd
        card={card.c}
        cardChange={cardChange ?? deckCardChange}
        deckid={cardChange ? null : deckid}
        disabledTooltip={!inventoryMode}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inventoryType={decks?.[deckid]?.inventoryType}
        isEditable={isEditable}
        q={qFrom}
        softUsedMax={softUsedMax}
      />
      <DiffQuantityDiffCard qFrom={qFrom} qTo={qTo} />
      <ResultLibraryTableRowCommon card={card.c} handleClick={handleClick} inDeck />
      {showInfo && (
        <td className="min-w-[40px] text-right sm:p-1">
          <DeckDrawProbability cardName={card.c.Name} N={libraryTotal} n={7} k={card.q} />
        </td>
      )}
    </tr>
  );
};

export default DiffLibraryTableRow;
