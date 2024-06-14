import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  DeckDrawProbability,
  DiffQuantityDiffCard,
  ResultCryptTableRowCommon,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useApp, usedStore, inventoryStore, deckStore, deckCardChange } from '@/context';
import { useDebounce } from '@/hooks';

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
  const decks = useSnapshot(deckStore).decks;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const softUsedMax = getSoftMax(usedCrypt.soft[card.Id]);
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.Id]);
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const qFrom = cardsFrom[card.c.Id]?.q ?? 0;
  const qTo = cardsTo[card.c.Id]?.q ?? 0;

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

  const trBg = isSwiped
    ? isSwiped === 'right'
      ? 'bg-bgSuccess dark:bg-bgSuccessDark'
      : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : 'bg-bgPrimary dark:bg-bgPrimaryDark even:bg-bgThird even:dark:bg-bgThirdDark ';

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
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        keyDisciplines={keyDisciplines}
        disciplinesSet={disciplinesSet}
        inDeck
      />
      {showInfo && (
        <td className="w-9 text-right text-fgSecondary dark:text-fgSecondaryDark">
          <DeckDrawProbability cardName={card.c.Name} N={cryptTotal} n={4} k={card.q} />
        </td>
      )}
    </tr>
  );
};

export default DiffCryptTableRow;
