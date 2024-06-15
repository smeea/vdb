import React, { useState } from 'react';
import { ButtonAddCard, ResultLibraryTableRowCommon } from '@/components';
import { deckCardChange } from '@/context';
import { useSwipe, useDebounce } from '@/hooks';

const DeckRecommendationLibraryTableRow = ({ card, handleClick, deck }) => {
  const [isSwiped, setIsSwiped] = useState();
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;
  const inDeck = deck.library[card.Id]?.q || 0;

  useDebounce(() => setIsSwiped(false), 500, [isSwiped]);
  const swipeHandlers = useSwipe(
    () => {
      if (isEditable) {
        setIsSwiped('left');
        deckCardChange(deck.deckid, card, inDeck - 1);
      }
    },
    () => {
      if (isEditable) {
        setIsSwiped('right');
        deckCardChange(deck.deckid, card, inDeck + 1);
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
