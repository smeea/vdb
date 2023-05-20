import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useSwipeable } from 'react-swipeable';
import {
  AccountLimitedDelCard,
  ButtonAddCard,
  ResultLibraryTableRowCommon,
  ResultUsed,
} from '@/components';
import { useApp, deckStore, deckCardChange } from '@/context';
import { useDebounce } from '@/hooks';

const ResultLibraryTableRow = ({ card, handleClick, idx, inLimited }) => {
  const { addMode, inventoryMode } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const inDeck = deck?.library[card.Id]?.q || 0;
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;

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
        isEditable &&
        addMode &&
        inDeck > 0
      ) {
        setIsSwiped('left');
        deckCardChange(deck.deckid, card, inDeck - 1);
      }
    },
    onSwipedRight: (e) => {
      if (e.absX > SWIPE_THRESHOLD && isEditable && addMode) {
        setIsSwiped('right');
        deckCardChange(deck.deckid, card, inDeck + 1);
      }
    },
  });

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
      {inLimited ? (
        <td className="min-w-[22px]">
          <AccountLimitedDelCard cardid={card.Id} target={inLimited} />
        </td>
      ) : (
        isEditable &&
        addMode && (
          <td>
            <ButtonAddCard deckid={deck.deckid} card={card} inDeck={inDeck} />
          </td>
        )
      )}
      {inventoryMode && (
        <td className="min-w-[60px]">
          <ResultUsed card={card} />
        </td>
      )}
      <ResultLibraryTableRowCommon card={card} handleClick={handleClick} />
    </tr>
  );
};

export default ResultLibraryTableRow;
