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
import {
  GROUPED_TYPE,
  POOL_COST,
  BLOOD_COST,
  TYPE,
  DISCIPLINE,
  ANY,
  MASTER,
  EVENT,
  CLAN,
} from '@/utils/constants';
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
    const poolTotal = countTotalCost(cardsFrom, POOL_COST);
    const poolToTotal = countTotalCost(cardsTo, POOL_COST);
    const bloodTotal = countTotalCost(cardsFrom, BLOOD_COST);
    const bloodToTotal = countTotalCost(cardsTo, BLOOD_COST);
    const libraryByTypeTotal = getTotalCardsGroupedBy(library, TYPE);
    const libraryByDisciplinesTotal = getTotalCardsGroupedBy(
      library.filter((card) => card.c.Discipline),
      DISCIPLINE,
    );
    const libraryByClansTotal = getTotalCardsGroupedBy(
      library.filter((card) => card.c.Clan && card.c.Type !== MASTER && card.c.Type !== EVENT),
      CLAN,
    );
    const anyDisciplines = countCards(
      library.filter(
        (card) =>
          !card.c.Clan && !card.c.Discipline && card.c.Type !== MASTER && card.c.Type !== EVENT,
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
