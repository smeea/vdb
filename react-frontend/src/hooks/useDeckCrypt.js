import { useState, useEffect } from 'react';
import { countCards, containCard, resultCryptSort } from 'utils';
import { ANY } from 'utils/constants';

const useDeckCrypt = (cardsList, sortMethod, timer, deckid, cardsToList) => {
  const cardsFrom = Object.values(cardsList);
  const cardsTo = cardsToList ? Object.values(cardsToList) : [];

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
  const hasBanned = cryptFrom.filter((card) => card.c.Banned).length > 0;

  const cryptTotal = countCards(cryptFrom);

  let cryptGroupMin = undefined;
  let cryptGroupMax = undefined;
  if (cryptFrom.length) {
    cryptGroupMin = cryptFrom
      .filter((card) => card.c.Group !== ANY)
      .reduce(
        (acc, card) => (acc = card.c.Group < acc ? card.c.Group : acc),
        10
      );

    cryptGroupMax = cryptFrom
      .filter((card) => card.c.Group !== ANY)
      .reduce(
        (acc, card) => (acc = card.c.Group > acc ? card.c.Group : acc),
        0
      );
  }

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  // Sort cards
  const [sortedState, setSortedState] = useState(
    resultCryptSort(crypt, sortMethod).map((c) => c.c.Id)
  );
  const [sortedSideState, setSortedSideState] = useState(
    resultCryptSort(cryptSide, sortMethod).map((c) => c.c.Id)
  );

  const sortedCards = crypt.sort((a, b) => {
    return sortedState.indexOf(a.c.Id) - sortedState.indexOf(b.c.Id);
  });
  const sortedCardsSide = cryptSide.sort((a, b) => {
    return sortedSideState.indexOf(a.c.Id) - sortedSideState.indexOf(b.c.Id);
  });

  useEffect(() => {
    setSortedState(resultCryptSort(crypt, sortMethod).map((c) => c.c.Id));
    setSortedSideState(
      resultCryptSort(cryptSide, sortMethod).map((c) => c.c.Id)
    );
  }, [timer, sortMethod, cardsToList]);

  return {
    crypt,
    cryptSide,
    hasBanned,
    cryptTotal,
    cryptGroups,
    sortedCards,
    sortedCardsSide,
  };
};

export default useDeckCrypt;
