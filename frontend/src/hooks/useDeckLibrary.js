import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import {
  countCards,
  countTotalCost,
  librarySort,
  getTotalCardsGroupedBy,
  containCard,
  getRestrictions,
} from '@/utils';
import { GROUPED_TYPE, POOL, BLOOD, TYPE, DISCIPLINE, ANY, MASTER, EVENT, CLAN } from '@/constants';
import { limitedStore } from '@/context';

const useDeckLibrary = (cardsList, cardsToList = {}) => {
  const limitedCards = useSnapshot(limitedStore);

  const value = useMemo(() => {
    const cardsFrom = Object.values(cardsList);
    const cardsTo = Object.values(cardsToList);
    const libraryFrom = cardsFrom.filter((card) => card.q > 0);
    const libraryTo = cardsTo.filter((card) => card.q > 0 && !containCard(libraryFrom, card));
    const libraryFromSide = cardsFrom.filter(
      (card) => card.q <= 0 && !containCard(libraryTo, card),
    );
    const libraryToSide = cardsTo.filter(
      (card) =>
        card.q <= 0 && !containCard(libraryFrom, card) && !containCard(libraryFromSide, card),
    );
    const library = librarySort(
      [...libraryFrom, ...libraryTo.map((card) => ({ q: 0, c: card.c }))],
      GROUPED_TYPE,
    );
    const librarySide = librarySort(
      [...libraryFromSide, ...libraryToSide.map((card) => ({ q: 0, c: card.c }))],
      GROUPED_TYPE,
    );
    const libraryByType = Object.groupBy(library, (card) => card.c[TYPE]);
    const librarySideByType = Object.groupBy(librarySide, (card) => card.c[TYPE]);

    const { hasBanned, hasLimited, hasPlaytest, hasIllegalDate } = getRestrictions(
      { crypt: {}, library: library },
      limitedCards,
    );

    const trifleTotal = countCards(library.filter((card) => card.c.Trifle));
    const libraryTotal = countCards(cardsFrom);
    const libraryToTotal = countCards(cardsTo);
    const poolTotal = countTotalCost(cardsFrom, POOL);
    const poolToTotal = countTotalCost(cardsTo, POOL);
    const bloodTotal = countTotalCost(cardsFrom, BLOOD);
    const bloodToTotal = countTotalCost(cardsTo, BLOOD);
    const libraryByTypeTotal = getTotalCardsGroupedBy(library, TYPE);
    const libraryByDisciplinesTotal = getTotalCardsGroupedBy(
      library.filter((card) => card.c[DISCIPLINE]),
      DISCIPLINE,
    );
    const libraryByClansTotal = getTotalCardsGroupedBy(
      library.filter((card) => card.c[CLAN] && card.c[TYPE] !== MASTER && card.c[TYPE] !== EVENT),
      CLAN,
    );
    const anyDisciplines = countCards(
      library.filter(
        (card) =>
          !card.c[CLAN] && !card.c[DISCIPLINE] && card.c[TYPE] !== MASTER && card.c[TYPE] !== EVENT,
      ),
    );

    if (anyDisciplines) {
      libraryByDisciplinesTotal[ANY] = anyDisciplines;
    }

    return {
      library,
      librarySide,
      libraryByType,
      librarySideByType,
      hasBanned,
      hasLimited,
      hasPlaytest,
      hasIllegalDate,
      trifleTotal,
      libraryTotal,
      libraryToTotal,
      poolTotal,
      poolToTotal,
      bloodTotal,
      bloodToTotal,
      libraryByTypeTotal,
      libraryByClansTotal,
      libraryByDisciplinesTotal,
    };
  }, [cardsList, cardsToList]);

  return value;
};

export default useDeckLibrary;
