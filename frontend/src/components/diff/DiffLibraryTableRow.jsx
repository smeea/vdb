import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  DeckDrawProbability,
  DiffQuantityDiffCard,
  ResultLibraryTableRowCommon,
} from '@/components';
import { getHardTotal, getSoftMax } from '@/utils';
import { useApp, deckStore, usedStore, inventoryStore, deckCardChange } from '@/context';
import { useSwipe, useDebounce } from '@/hooks';

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
  const decks = useSnapshot(deckStore).decks;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]);
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);
  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const qFrom = cardsFrom[card.c.Id]?.q ?? 0;
  const qTo = cardsTo[card.c.Id]?.q ?? 0;

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

  const trBg = isSwiped
    ? isSwiped === 'right'
      ? 'bg-bgSuccess dark:bg-bgSuccessDark'
      : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : 'row-bg';

  return (
    <tr
      {...swipeHandlers}
      className={`h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark  ${trBg}`}
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
        <td className="w-9 text-right text-fgSecondary dark:text-fgSecondaryDark">
          <DeckDrawProbability cardName={card.c.Name} N={libraryTotal} n={7} k={card.q} />
        </td>
      )}
    </tr>
  );
};

export default DiffLibraryTableRow;
