import {
  LimitedDelCard,
  ButtonAddCard,
  ResultCryptTableRowCommon,
  ResultUsed,
} from "@/components";
import { CRYPT, DECK, DECKID, ID } from "@/constants";
import { deckCardChange, deckStore, useApp } from "@/context";
import { useSwipe } from "@/hooks";
import { getIsEditable, getSwipedBg } from "@/utils";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";

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
        "h-[38px] border-bgSecondary border-y dark:border-bgSecondaryDark",
        getSwipedBg(isSwiped),
      )}
    >
      {inLimited ? (
        <td className="min-w-[22px]">
          <LimitedDelCard cardid={card[ID]} target={inLimited} />
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
