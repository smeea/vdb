import React from 'react';
import { useSnapshot } from 'valtio';
import { deckCardChange, useApp, usedStore, inventoryStore, limitedStore } from '@/context';
import {
  DeckCardToggleInventoryStateTd,
  DeckCardQuantityTd,
  ResultLibraryTableRowCommon,
  DeckDrawProbability,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useSwipe } from '@/hooks';
import { LIBRARY } from '@/utils/constants';

const DeckLibraryTableRow = ({
  handleClick,
  card,
  deck,
  showInfo,
  libraryTotal,
  inSearch,
  inMissing,
  shouldShowModal,
}) => {
  const { limitedMode, inventoryMode, isDesktop } = useApp();
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const limitedLibrary = useSnapshot(limitedStore)[LIBRARY];
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

  const inLimited = limitedLibrary[card.c.Id];
  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]) ?? 0;

  const trBg = isSwiped
    ? isSwiped === 'right'
      ? 'bg-bgSuccess dark:bg-bgSuccessDark'
      : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : 'row-bg ';

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
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inMissing={inMissing}
        inventoryType={deck.inventoryType}
        isEditable={isEditable}
        q={card.q}
        softUsedMax={softUsedMax}
      />
      <ResultLibraryTableRowCommon
        isBanned={limitedMode && !inLimited}
        card={card.c}
        handleClick={handleClick}
        inSearch={inSearch}
        shouldShowModal={shouldShowModal}
        inDeck
      />
      {showInfo && (
        <td className="min-w-[40px] text-right sm:p-1">
          <DeckDrawProbability cardName={card.c.Name} N={libraryTotal} n={7} k={card.q} />
        </td>
      )}
    </tr>
  );
};

export default DeckLibraryTableRow;
