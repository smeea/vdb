import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonAddCard, ResultLibraryTableRowCommon } from '@/components';
import { deckCardChange } from '@/context';
import { getSwipedBg } from '@/utils';
import { useSwipe } from '@/hooks';

const DeckRecommendationLibraryTableRow = ({ card, handleClick, deck }) => {
  const isEditable = deck?.isAuthor && !deck?.isPublic && !deck?.isFrozen;
  const inDeck = deck[LIBRARY][card[ID]]?.q || 0;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deck.deckid, card, inDeck - 1),
    () => deckCardChange(deck.deckid, card, inDeck + 1),
    isEditable,
  );

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        'h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark',
        getSwipedBg(isSwiped),
      )}
    >
      {isEditable && (
        <td>
          <ButtonAddCard cardid={card[ID]} deckid={deck.deckid} card={card} inDeck={inDeck} />
        </td>
      )}
      <ResultLibraryTableRowCommon card={card} handleClick={handleClick} inDeck />
    </tr>
  );
};

export default DeckRecommendationLibraryTableRow;
