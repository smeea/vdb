import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonAddCard, ResultLibraryTableRowCommon } from '@/components';
import { deckCardChange } from '@/context';
import { getIsEditable, getSwipedBg } from '@/utils';
import { useSwipe } from '@/hooks';
import { LIBRARY, ID, DECKID } from '@/constants';

const DeckRecommendationLibraryTableRow = ({ card, handleClick, deck }) => {
  const inDeck = deck[LIBRARY][card[ID]]?.q || 0;
  const isEditable = getIsEditable(deck);

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deck[DECKID], card, inDeck - 1),
    () => deckCardChange(deck[DECKID], card, inDeck + 1),
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
          <ButtonAddCard cardid={card[ID]} deckid={deck[DECKID]} card={card} inDeck={inDeck} />
        </td>
      )}
      <ResultLibraryTableRowCommon card={card} handleClick={handleClick} inDeck />
    </tr>
  );
};

export default DeckRecommendationLibraryTableRow;
