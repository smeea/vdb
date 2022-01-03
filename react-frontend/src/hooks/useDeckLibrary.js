import {
  countCards,
  countTotalCost,
  isTriffle,
  resultLibrarySort,
  getTotalCardsGroupedBy,
  getCardsGroupedBy,
  containCard,
} from 'utils';
import {
  GROUPED_TYPE,
  POOL_COST,
  BLOOD_COST,
  TYPE,
  DISCIPLINE,
  ANY,
  MASTER,
  CLAN,
} from 'utils/constants';

const useDeckLibrary = (cardsList, nativeLibrary, cardsToList = {}) => {
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

  const library = resultLibrarySort(
    [...libraryFrom, ...libraryTo.map((card) => ({ q: 0, c: card.c }))],
    GROUPED_TYPE
  );

  const librarySide = resultLibrarySort(
    [...libraryFromSide, ...libraryToSide.map((card) => ({ q: 0, c: card.c }))],
    GROUPED_TYPE
  );

  const libraryByType = getCardsGroupedBy(library, TYPE);
  const librarySideByType = getCardsGroupedBy(librarySide, TYPE);

  const hasBanned = library.filter((card) => card.c.Banned).length > 0;

  const trifleTotal = countCards(
    library.filter((card) => isTriffle(card.c, nativeLibrary))
  );

  const libraryTotal = countCards(library);

  const poolTotal = countTotalCost(library, POOL_COST);

  const bloodTotal = countTotalCost(library, BLOOD_COST);

  const libraryByTypeTotal = getTotalCardsGroupedBy(library, TYPE);

  const libraryByDisciplinesTotal = getTotalCardsGroupedBy(
    library.filter((card) => card.c.Dicipline),
    DISCIPLINE
  );

  const libraryByClansTotal = getTotalCardsGroupedBy(
    library.filter((card) => card.c.Clan && card.c.Type !== MASTER),
    CLAN
  );

  libraryByDisciplinesTotal[ANY] = countCards(
    library.filter(
      (card) => !card.c.Clan && !card.c.Dicipline && card.c.Type !== MASTER
    )
  );

  return {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    hasBanned,
    trifleTotal,
    libraryTotal,
    poolTotal,
    bloodTotal,
    libraryByTypeTotal,
    libraryByClansTotal,
  };
};

export default useDeckLibrary;
