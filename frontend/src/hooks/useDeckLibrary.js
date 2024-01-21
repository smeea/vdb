import { useSnapshot } from 'valtio';
import {
  countCards,
  countTotalCost,
  isTrifle,
  librarySort,
  getTotalCardsGroupedBy,
  getCardsGroupedBy,
  containCard,
  getLegality,
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
  PLAYTEST,
} from '@/utils/constants';
import { limitedStore } from '@/context';

const useDeckLibrary = (cardsList, cardsToList = {}) => {
  const limitedLibrary = useSnapshot(limitedStore).library;

  const cardsFrom = Object.values(cardsList);
  const cardsTo = Object.values(cardsToList);
  const libraryFrom = cardsFrom.filter((card) => card.q > 0);
  const libraryTo = cardsTo.filter(
    (card) => card.q > 0 && !containCard(libraryFrom, card)
  );
  const libraryFromSide = cardsFrom.filter(
    (card) => card.q <= 0 && !containCard(libraryTo, card)
  );
  const libraryToSide = cardsTo.filter(
    (card) =>
      card.q <= 0 &&
      !containCard(libraryFrom, card) &&
      !containCard(libraryFromSide, card)
  );
  const library = librarySort(
    [...libraryFrom, ...libraryTo.map((card) => ({ q: 0, c: card.c }))],
    GROUPED_TYPE
  );
  const librarySide = librarySort(
    [...libraryFromSide, ...libraryToSide.map((card) => ({ q: 0, c: card.c }))],
    GROUPED_TYPE
  );
  const libraryByType = getCardsGroupedBy(library, TYPE);
  const librarySideByType = getCardsGroupedBy(librarySide, TYPE);
  const hasBanned = library.filter((card) => card.c.Banned).length > 0;
  let hasPlaytest;
  let hasIllegalDate;
  library.map((card) => {
    const legalRestriction = getLegality(card.c);
    if (legalRestriction && legalRestriction === PLAYTEST) {
      hasPlaytest = true;
    }
    if (legalRestriction && legalRestriction !== PLAYTEST) {
      hasIllegalDate = legalRestriction;
    }
  });
  const hasLimited =
    library.filter((card) => !limitedLibrary[card.c.Id]).length > 0;

  const trifleTotal = countCards(library.filter((card) => isTrifle(card.c)));
  const libraryTotal = countCards(library);
  const poolTotal = countTotalCost(library, POOL_COST);
  const bloodTotal = countTotalCost(library, BLOOD_COST);
  const libraryByTypeTotal = getTotalCardsGroupedBy(library, TYPE);
  const libraryByDisciplinesTotal = getTotalCardsGroupedBy(
    library.filter((card) => card.c.Discipline),
    DISCIPLINE
  );
  const libraryByClansTotal = getTotalCardsGroupedBy(
    library.filter(
      (card) => card.c.Clan && card.c.Type !== MASTER && card.c.Type !== EVENT
    ),
    CLAN
  );
  const anyDisciplines = countCards(
    library.filter(
      (card) =>
        !card.c.Clan &&
        !card.c.Discipline &&
        card.c.Type !== MASTER &&
        card.c.Type !== EVENT
    )
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
    poolTotal,
    bloodTotal,
    libraryByTypeTotal,
    libraryByClansTotal,
    libraryByDisciplinesTotal,
  };
};

export default useDeckLibrary;
