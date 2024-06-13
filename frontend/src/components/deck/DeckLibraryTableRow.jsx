import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSnapshot } from 'valtio';
import { deckCardChange, useApp, usedStore, inventoryStore, limitedStore } from '@/context';
import {
  DeckCardToggleInventoryStateTd,
  DeckCardQuantityTd,
  ResultLibraryTableRowCommon,
  DeckDrawProbability,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useDebounce } from '@/hooks';

const DeckLibraryTableRow = ({
  idx,
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
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const limitedLibrary = useSnapshot(limitedStore).library;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const [isSwiped, setIsSwiped] = useState();
  useDebounce(() => setIsSwiped(false), 500, [isSwiped]);
  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    swipeDuration: 250,
    onSwipedLeft: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE && e.absX > SWIPE_THRESHOLD && isEditable) {
        setIsSwiped('left');
        deckCardChange(deckid, card.c, card.q - 1);
      }
    },
    onSwipedRight: (e) => {
      if (e.absX > SWIPE_THRESHOLD && isEditable) {
        setIsSwiped('right');
        deckCardChange(deckid, card.c, card.q + 1);
      }
    },
  });

  const inLimited = limitedLibrary[card.c.Id];
  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]) ?? 0;

  const trBg = isSwiped
    ? isSwiped === 'right'
      ? 'bg-bgSuccess dark:bg-bgSuccessDark'
      : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : idx % 2
    ? 'bg-bgThird dark:bg-bgThirdDark'
    : 'bg-bgPrimary dark:bg-bgPrimaryDark';

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
        <td className="min-w-[40px]">
          <div className="flex justify-end">
            <DeckDrawProbability cardName={card.c.Name} N={libraryTotal} n={7} k={card.q} />
          </div>
        </td>
      )}
    </tr>
  );
};

export default DeckLibraryTableRow;
