import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useDebounce } from '@/hooks';
import { ButtonAddCard, ResultLibraryTableRowCommon } from '@/components';
import { deckCardChange } from '@/context';

const DeckRecommendationLibraryTableRow = ({ card, handleClick, deck }) => {
  const [isSwiped, setIsSwiped] = useState();
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;
  const inDeck = deck.library[card.Id]?.q || 0;

  useDebounce(() => setIsSwiped(false), 500, [isSwiped]);
  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    swipeDuration: 250,
    onSwipedLeft: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE && e.absX > SWIPE_THRESHOLD && isEditable) {
        setIsSwiped('left');
        deckCardChange(deck.deckid, card, inDeck - 1);
      }
    },
    onSwipedRight: (e) => {
      if (e.absX > SWIPE_THRESHOLD && isEditable) {
        setIsSwiped('right');
        deckCardChange(deck.deckid, card, inDeck + 1);
      }
    },
  });

  const trBg = isSwiped
    ? isSwiped === 'right'
      ? 'bg-bgSuccess dark:bg-bgSuccessDark'
      : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
    : 'bg-bgPrimary dark:bg-bgPrimaryDark even:bg-bgThird even:dark:bg-bgThirdDark';

  return (
    <tr
      {...swipeHandlers}
      className={`h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark  ${trBg}`}
    >
      {isEditable && (
        <td>
          <ButtonAddCard cardid={card.Id} deckid={deck.deckid} card={card} inDeck={inDeck} />
        </td>
      )}
      <ResultLibraryTableRowCommon card={card} handleClick={handleClick} inDeck />
    </tr>
  );
};

export default DeckRecommendationLibraryTableRow;
