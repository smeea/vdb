import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { countCards, containCard, getGroups, getRestrictions } from '@/utils';
import {
  CRYPT,
  CRYPT_TIMER,
  HAS_BANNED,
  HAS_ILLEGAL_DATE,
  HAS_LIMITED,
  HAS_PLAYTEST,
  LIBRARY,
  NAME,
} from '@/constants';
import { useCryptSortWithTimer } from '@/hooks';
import { miscStore, limitedStore } from '@/context';

const useDeckCrypt = (cardsList, sortMethod = NAME, cardsToList = {}) => {
  const timer = useSnapshot(miscStore)[CRYPT_TIMER];
  const cryptFrom = Object.values(cardsList).filter((card) => card.q > 0);
  const cryptTo = Object.values(cardsToList).filter(
    (card) => card.q > 0 && !containCard(cryptFrom, card),
  );
  const cryptFromSide = Object.values(cardsList).filter(
    (card) => card.q <= 0 && !containCard(cryptTo, card),
  );
  const cryptToSide = Object.values(cardsToList).filter(
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
      [HAS_ILLEGAL_DATE]: hasIllegalDate,
    } = getRestrictions({ [CRYPT]: cryptFrom, [LIBRARY]: {} }, limitedStore);

    const cryptTotal = countCards(cryptFrom);
    const cryptToTotal = countCards(cryptTo);
    const { hasWrongGroups, cryptGroups } = getGroups(cryptFrom);

    return {
      crypt,
      cryptSide,
      hasBanned,
      hasLimited,
      hasPlaytest,
      hasIllegalDate,
      cryptTotal,
      cryptToTotal,
      cryptGroups,
      hasWrongGroups,
      sortedCards,
      sortedCardsSide,
    };
  }, [cardsList, cardsToList, timer, sortMethod]);
};

export default useDeckCrypt;
