import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSnapshot } from 'valtio';
import Shuffle from '@/assets/images/icons/shuffle.svg';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg';
import {
  deckCardChange,
  deckUpdate,
  useApp,
  usedStore,
  inventoryStore,
  deckStore,
} from '@/context';
import {
  DeckCardQuantityTd,
  ResultLibraryTableRowCommon,
  DeckDrawProbability,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';

const DeckLibraryTableRow = ({
  idx,
  handleClick,
  card,
  deck,
  showInfo,
  libraryTotal,
  inSearch,
  inMissing,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const [isSwiped, setIsSwiped] = useState();
  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    swipeDuration: 250,
    onSwipedRight: (e) => {
      if (
        e.initial[0] > SWIPE_IGNORED_LEFT_EDGE &&
        e.absX > SWIPE_THRESHOLD &&
        isEditable
      )
        deckCardChange(deckid, card.c, card.q - 1);
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD && isEditable)
        deckCardChange(deckid, card.c, card.q + 1);
    },
    onSwiped: () => {
      setIsSwiped(false);
    },
    onSwiping: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE) {
        if (e.deltaX < -SWIPE_THRESHOLD) {
          setIsSwiped('left');
        } else if (e.deltaX > SWIPE_THRESHOLD) {
          setIsSwiped('right');
        } else {
          setIsSwiped(false);
        }
      }
    },
  });

  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]) ?? 0;

  const toggleInventoryState = (deckid, cardid) => {
    const value = card.i ? '' : deck.inventoryType === 's' ? 'h' : 's';
    deckUpdate(deckid, 'usedInInventory', {
      [cardid]: value,
    });
  };

  const trBg = isSwiped
    ? isSwiped === 'left'
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
      {inventoryMode &&
        deck.inventoryType &&
        !inMissing &&
        !inSearch &&
        !isMobile && (
          <td className="max-w-0">
            <div className="relative flex items-center">
              <div
                className={`inventory-card-custom absolute left-[-24px]
                        ${card.i ? '' : 'not-selected opacity-0'}
                      `}
                onClick={() => toggleInventoryState(deckid, card.c.Id)}
              >
                {deck.inventoryType == 's' ? <PinAngleFill /> : <Shuffle />}
              </div>
            </div>
          </td>
        )}
      <DeckCardQuantityTd
        card={card.c}
        cardChange={deckCardChange}
        deckid={deckid}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inMissing={inMissing}
        inventoryType={decks?.[deckid]?.inventoryType}
        isEditable={isEditable}
        q={card.q}
        softUsedMax={softUsedMax}
      />
      <ResultLibraryTableRowCommon
        card={card.c}
        handleClick={handleClick}
        inSearch={inSearch}
        inDeck
      />
      {showInfo && (
        <td className="min-w-[45px] text-right text-fgSecondary  dark:text-fgSecondaryDark">
          <DeckDrawProbability
            cardName={card.c.Name}
            N={libraryTotal}
            n={7}
            k={card.q}
          />
        </td>
      )}
    </tr>
  );
};

export default DeckLibraryTableRow;
