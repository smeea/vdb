import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { countCards, containCard, getGroups, cryptSort, getRestrictions } from '@/utils';
import { NAME } from '@/utils/constants';
import { limitedStore } from '@/context';

const useDeckCrypt = (cardsList, sortMethod = NAME, timer, cardsToList = {}) => {
  const limitedCards = useSnapshot(limitedStore);

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

  const sortedState = useMemo(() => {
    return cryptSort(crypt, sortMethod).map((c) => c.c.Id);
  }, [timer, sortMethod]);

  const sortedSideState = useMemo(() => {
    return cryptSort(cryptSide, sortMethod).map((c) => c.c.Id);
  }, [timer, sortMethod]);

  const sortedCards = crypt.toSorted((a, b) => {
    return sortedState.indexOf(a.c.Id) - sortedState.indexOf(b.c.Id);
  });

  const sortedCardsSide = cryptSide.toSorted((a, b) => {
    return sortedSideState.indexOf(a.c.Id) - sortedSideState.indexOf(b.c.Id);
  });

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
