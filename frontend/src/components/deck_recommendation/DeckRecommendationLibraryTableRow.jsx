import { twMerge } from 'tailwind-merge';
import { ButtonAddCard, ResultLibraryTableRowCommon } from '@/components';
import { DECKID, ID, LIBRARY } from '@/constants';
import { deckCardChange } from '@/context';
import { useSwipe } from '@/hooks';
import { getIsEditable, getSwipedBg } from '@/utils';

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
        'border-bgSecondary dark:border-bgSecondaryDark h-[38px] border-y',
        getSwipedBg(isSwiped),
      )}
    >
      {isEditable && (
        <td>
          <ButtonAddCard deckid={deck[DECKID]} card={card} inDeck={inDeck} />
        </td>
      )}
      <ResultLibraryTableRowCommon card={card} handleClick={handleClick} inDeck />
    </tr>
  );
};

export default DeckRecommendationLibraryTableRow;
