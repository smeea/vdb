import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  AccountLimitedDelCard,
  ButtonAddCard,
  ResultCryptTableRowCommon,
  ResultUsed,
} from '@/components';
import { CRYPT, DECK, DECKID, ID } from '@/constants';
import { deckCardChange, deckStore, useApp } from '@/context';
import { useSwipe } from '@/hooks';
import { getIsEditable, getSwipedBg } from '@/utils';

const ResultCryptTableRow = ({
  card,
  handleClick,
  inRecommendation,
  inLimited,
  shouldShowModal,
}) => {
  const { addMode, inventoryMode } = useApp();
  const deck = useSnapshot(deckStore)[DECK];
  const inDeck = deck?.[CRYPT][card[ID]]?.q || 0;
  const isEditable = getIsEditable(deck);

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deck[DECKID], card, inDeck - 1),
    () => deckCardChange(deck[DECKID], card, inDeck + 1),
    isEditable && addMode,
    inDeck > 0,
  );

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        'border-bgSecondary dark:border-bgSecondaryDark h-[38px] border-y',
        getSwipedBg(isSwiped),
      )}
    >
      {inLimited ? (
        <td className="min-w-[22px]">
          <AccountLimitedDelCard cardid={card[ID]} target={inLimited} />
        </td>
      ) : (
        (inRecommendation || addMode) && (
          <td className="min-w-[22px]">
            <ButtonAddCard
              disabled={!isEditable}
              deckid={deck?.[DECKID]}
              card={card}
              inDeck={inDeck}
            />
          </td>
        )
      )}
      {inventoryMode && (
        <td className="min-w-[60px]">
          <ResultUsed card={card} />
        </td>
      )}
      <ResultCryptTableRowCommon
        card={card}
        handleClick={handleClick}
        shouldShowModal={shouldShowModal}
      />
    </tr>
  );
};

export default ResultCryptTableRow;
