import TrashFill from "@icons/trash-fill.svg?react";
import { ButtonIconed } from "@/components";
import { CARDS, CRYPT, DECKID, LIBRARY } from "@/constants";
import { deckUpdate, useApp } from "@/context";
import { deepClone, getIsPlaytest } from "@/utils";

const DeckDeletePlaytestButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();

  const noPlaytestDeck = { [CRYPT]: deepClone(deck[CRYPT]), [LIBRARY]: deepClone(deck[LIBRARY]) };
  Object.keys(noPlaytestDeck[CRYPT]).forEach((cardid) => {
    if (getIsPlaytest(cardid)) noPlaytestDeck[CRYPT][cardid].q = -1;
  });
  Object.keys(noPlaytestDeck[LIBRARY]).forEach((cardid) => {
    if (getIsPlaytest(cardid)) noPlaytestDeck[LIBRARY][cardid].q = -1;
  });

  const handleClick = () => {
    deckUpdate(deck[DECKID], CARDS, noPlaytestDeck).finally(() => {
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    });
  };

  return (
    <ButtonIconed
      variant={!isDesktop ? "primary" : "secondary"}
      onClick={handleClick}
      title="Remove Playtest Cards"
      icon={<TrashFill width="18" height="22" viewBox="0 0 18 16" />}
      text="Remove Playtest Cards"
    />
  );
};

export default DeckDeletePlaytestButton;
