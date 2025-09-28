import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { CRYPT, CRYPT_TIMER, HAS_BANNED, HAS_LIMITED, HAS_PLAYTEST, LIBRARY } from "@/constants";
import { limitedStore, miscStore } from "@/context";
import { useCryptSortWithTimer } from "@/hooks";
import { containCard, countCards, getGroups, getRestrictions } from "@/utils";

const useDeckCrypt = (cardsList, sortMethod, cardsToList) => {
  const limitedCrypt = useSnapshot(limitedStore)[CRYPT];
  const timer = useSnapshot(miscStore)[CRYPT_TIMER];

  const cardsFrom = Object.values(cardsList);
  const cardsTo = Object.values(cardsToList || {});
  const cryptFrom = cardsFrom.filter((card) => card.q > 0);
  const cryptTo = cardsTo.filter((card) => card.q > 0 && !containCard(cryptFrom, card));
  const cryptFromSide = cardsFrom.filter((card) => card.q <= 0 && !containCard(cryptTo, card));
  const cryptToSide = cardsTo.filter(
    (card) => card.q <= 0 && !containCard(cryptFrom, card) && !containCard(cryptFromSide, card),
  );
  const crypt = [...cryptFrom, ...cryptTo.map((card) => ({ q: 0, c: card.c }))];
  const cryptSide = [...cryptFromSide, ...cryptToSide.map((card) => ({ q: 0, c: card.c }))];
  const sortedCards = useCryptSortWithTimer(crypt, sortMethod);
  const sortedCardsSide = useCryptSortWithTimer(cryptSide, sortMethod);

  return useMemo(() => {
    const {
      [HAS_BANNED]: hasBanned,
      [HAS_LIMITED]: hasLimited,
      [HAS_PLAYTEST]: hasPlaytest,
    } = getRestrictions(
      { [CRYPT]: cryptFrom, [LIBRARY]: {} },
      { [CRYPT]: limitedCrypt, [LIBRARY]: {} },
    );

    const cryptTotal = countCards(cardsFrom);
    const cryptToTotal = countCards(cardsTo);
    const { hasWrongGroups, cryptGroups } = getGroups(cryptFrom);

    return {
      crypt,
      cryptSide,
      hasBanned,
      hasLimited,
      hasPlaytest,
      cryptTotal,
      cryptToTotal,
      cryptGroups,
      hasWrongGroups,
      sortedCards,
      sortedCardsSide,
    };
  }, [cardsList, cardsToList, timer, limitedCrypt, sortMethod]);
};

export default useDeckCrypt;
