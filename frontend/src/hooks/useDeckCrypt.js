import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { countCards, containCard, cryptSort, getRestrictions } from '@/utils';
import { ANY } from '@/utils/constants';
import { limitedStore } from '@/context';

const useDeckCrypt = (
  cardsList,
  sortMethod = 'byName',
  timer,
  cardsToList = {}
) => {
  const limitedCards = useSnapshot(limitedStore);

  const cardsFrom = Object.values(cardsList);
  const cardsTo = Object.values(cardsToList);
  const cryptFrom = Object.values(cardsFrom).filter((card) => card.q > 0);
  const cryptTo = Object.values(cardsTo).filter(
    (card) => card.q > 0 && !containCard(cryptFrom, card)
  );

  const cryptFromSide = Object.values(cardsFrom).filter(
    (card) => card.q <= 0 && !containCard(cryptTo, card)
  );
  const cryptToSide = Object.values(cardsTo).filter(
    (card) =>
      card.q <= 0 &&
      !containCard(cryptFrom, card) &&
      !containCard(cryptFromSide, card)
  );

  const crypt = [...cryptFrom, ...cryptTo.map((card) => ({ q: 0, c: card.c }))];
  const cryptSide = [
    ...cryptFromSide,
    ...cryptToSide.map((card) => ({ q: 0, c: card.c })),
  ];

  const { hasBanned, hasLimited, hasPlaytest, hasIllegalDate } =
    getRestrictions({ crypt: cryptFrom, library: {} }, limitedCards);

  const cryptTotal = countCards(cryptFrom);
  const cryptGroupMin = cryptFrom
    .filter((card) => card.c.Group !== ANY)
    .reduce((acc, card) => (acc = card.c.Group < acc ? card.c.Group : acc), 10);
  const cryptGroupMax = cryptFrom
    .filter((card) => card.c.Group !== ANY)
    .reduce((acc, card) => (acc = card.c.Group > acc ? card.c.Group : acc), 0);

  let cryptGroups;
  let hasWrongGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = `- G${cryptGroupMin}-${cryptGroupMax}`;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = `- G${cryptGroupMax}`;
  } else if (cryptGroupMin && cryptGroupMax) {
    hasWrongGroups = true;
  }

  const sortedState = useMemo(() => {
    return cryptSort(crypt, sortMethod).map((c) => c.c.Id);
  }, [timer, sortMethod]);

  const sortedSideState = useMemo(() => {
    return cryptSort(cryptSide, sortMethod).map((c) => c.c.Id);
  }, [timer, sortMethod]);

  const sortedCards = crypt.sort((a, b) => {
    return sortedState.indexOf(a.c.Id) - sortedState.indexOf(b.c.Id);
  });

  const sortedCardsSide = cryptSide.sort((a, b) => {
    return sortedSideState.indexOf(a.c.Id) - sortedSideState.indexOf(b.c.Id);
  });

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
};

export default useDeckCrypt;
