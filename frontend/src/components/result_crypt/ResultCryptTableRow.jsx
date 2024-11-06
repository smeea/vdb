import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  AccountLimitedDelCard,
  ButtonAddCard,
  ResultCryptTableRowCommon,
  ResultUsed,
} from '@/components';
import { useApp, deckStore, deckCardChange } from '@/context';
import { useSwipe } from '@/hooks';
import { getSwipedBg } from '@/utils';
import { DECK } from '@/constants';

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
  const isEditable = deck?.[IS_AUTHOR] && !deck?.[IS_PUBLIC] && !deck?.[IS_FROZEN];

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
        'h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark',
        getSwipedBg(isSwiped),
      )}
    >
      {inLimited ? (
        <td className="min-w-[22px]">
          <AccountLimitedDelCard cardid={card[ID]} target={inLimited} />
        </td>
      ) : (
        (inRecommendation ? isEditable : isEditable && addMode) && (
          <td className="min-w-[22px]">
            <ButtonAddCard cardid={card[ID]} deckid={deck[DECKID]} card={card} inDeck={inDeck} />
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
