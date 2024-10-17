import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonAddCard, ResultLibraryTableRowCommon } from '@/components';
import { deckCardChange } from '@/context';
import { useSwipe } from '@/hooks';

const DeckRecommendationLibraryTableRow = ({ card, handleClick, deck }) => {
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;
  const inDeck = deck.library[card.Id]?.q || 0;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deck.deckid, card, inDeck - 1),
    () => deckCardChange(deck.deckid, card, inDeck + 1),
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
      className={twMerge('h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark', trBg)}
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
