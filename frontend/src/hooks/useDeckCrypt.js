import React, { useMemo } from 'react';
import { countCards, containCard, cryptSort } from 'utils';
import { ANY } from 'utils/constants';
import Exclamation from 'assets/images/icons/exclamation-triangle.svg';

const useDeckCrypt = (cardsList, sortMethod, timer, cardsToList = {}) => {
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
    cryptGroups = `- G${cryptGroupMin}-${cryptGroupMax}`;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = `- G${cryptGroupMax}`;
  } else {
    cryptGroups = (
      <div className="inline items-center text-fgRed dark:text-fgRedDark">
        <Exclamation
          width="17"
          heigth="17"
          viewBox="0 2 16 16"
          className="inline pr-1"
        />
        GROUPS
      </div>
    );
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
    cryptTotal,
    cryptGroups,
    sortedCards,
    sortedCardsSide,
  };
};

export default useDeckCrypt;
