import { Button } from "@/components";
import { DECKS, NAME } from "@/constants";
import { deckCardChange, deckStore } from "@/context";
import PlusLg from "@icons/plus-lg.svg?react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";

const ButtonAddCard = ({ deckid, card, inDeck, inQuick, disabled }) => {
  const decks = useSnapshot(deckStore)[DECKS];

  const handleClick = useCallback(() => {
    deckCardChange(deckid, card, inDeck + 1);
  }, [deckid, card, inDeck]);

  let title = "Add to Deck";
  if (inQuick && decks?.[deckid]) {
    title = inDeck ? `In deck "${decks[deckid][NAME]}"` : `Add to Deck "${decks[deckid][NAME]}"`;
  }

  return (
    <Button
      className="h-[33px] w-[24px]"
      variant={inDeck ? "third" : "primary"}
      onClick={handleClick}
      title={title}
      disabled={disabled}
      noPadding
    >
      {inDeck ? inDeck : <PlusLg width="15" height="15" viewBox="0 0 16 16" />}
    </Button>
  );
};

export default ButtonAddCard;
