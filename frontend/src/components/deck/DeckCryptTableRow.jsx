import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSnapshot } from 'valtio';
import Shuffle from '@/assets/images/icons/shuffle.svg?react';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg?react';
import {
  deckCardChange,
  deckUpdate,
  useApp,
  usedStore,
  inventoryStore,
  limitedStore,
} from '@/context';
import {
  DeckCardQuantityTd,
  ResultCryptTableRowCommon,
  DeckDrawProbability,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useDebounce } from '@/hooks';

const DeckCryptTableRow = ({
  idx,
  handleClick,
  card,
  deck,
  disciplinesSet,
  keyDisciplines,
  showInfo,
  cryptTotal,
  inSearch,
  inMissing,
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
  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    swipeDuration: 250,
    onSwipedLeft: (e) => {
      if (
        e.initial[0] > SWIPE_IGNORED_LEFT_EDGE &&
        e.absX > SWIPE_THRESHOLD &&
        isEditable
      ) {
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

  const inLimited = limitedCrypt[card.c.Id];
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]) ?? 0;

  const toggleInventoryState = (deckid, cardid) => {
    const value = card.i ? '' : deck.inventoryType === 's' ? 'h' : 's';
    deckUpdate(deckid, 'usedInInventory', {
      [cardid]: value,
    });
  };

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
      {inventoryMode &&
        deck.inventoryType &&
        !inMissing &&
        !inSearch &&
        isDesktop && (
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
        inDeck
      />
      {showInfo && (
        <td className="min-w-[40px]">
          <div className="flex justify-end">
            <DeckDrawProbability
              cardName={card.c.Name}
              N={cryptTotal}
              n={4}
              k={card.q}
            />
          </div>
        </td>
      )}
    </tr>
  );
};

export default DeckCryptTableRow;
