import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { cryptSortWithTimer, countCards, containCard, getGroups, getRestrictions } from '@/utils';
import { NAME } from '@/utils/constants';
import { miscStore, limitedStore } from '@/context';

const useDeckCrypt = (cardsList, sortMethod = NAME, cardsToList = {}) => {
  const limitedCards = useSnapshot(limitedStore);
  const timer = useSnapshot(miscStore).cryptTimer;

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

  const sortedCards = cryptSortWithTimer(crypt, sortMethod)
  const sortedCardsSide = cryptSortWithTimer(cryptSide, sortMethod)

  const value = useMemo(() => {
    const { hasBanned, hasLimited, hasPlaytest, hasIllegalDate } = getRestrictions(
      { crypt: cryptFrom, library: {} },
      limitedCards,
    );

    const cryptTotal = countCards(cryptFrom);
    const { hasWrongGroups, cryptGroups } = getGroups(cryptFrom);

    return {
      crypt,
      cryptSide,
      hasBanned,
      hasLimited,
      hasPlaytest,
      hasIllegalDate,
      cryptTotal,
      cryptGroups,
      hasWrongGroups,
      sortedCards,
      sortedCardsSide,
    };
  }, [cardsList, cardsToList, timer, sortMethod]);

  return value;
};

export default useDeckCrypt;
