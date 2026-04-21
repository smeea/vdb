import { useSnapshot } from "valtio";
import sectsOpts from "@/assets/data/sectsList.json";
import {
  ANY,
  BLOOD,
  CLAN,
  CRYPT,
  DISCIPLINE,
  GROUPED_TYPE,
  HAS_BANNED,
  HAS_LIMITED,
  HAS_PLAYTEST,
  LIBRARY,
  PATH,
  POOL,
  REQUIREMENT,
  TRIFLE,
  TYPE,
  TYPE_MASTER,
  TITLE,
  ARCHBISHOP,
  BARON,
  BISHOP,
  CARDINAL,
  INNER_CIRCLE,
  JUSTICAR,
  MAGAJI,
  PRIMOGEN,
  PRINCE,
  PRISCUS,
  REGENT,
  TITLED,
  VOTE_1,
  VOTE_2,
} from "@/constants";
import { limitedStore } from "@/context";
import {
  containCard,
  countCards,
  countTotalCost,
  getRestrictions,
  getTotalCardsGroupedBy,
  librarySort,
  capitalize,
} from "@/utils";

const titlesOpts = [
  PRIMOGEN,
  PRINCE,
  JUSTICAR,
  INNER_CIRCLE,
  BARON,
  VOTE_1,
  VOTE_2,
  BISHOP,
  ARCHBISHOP,
  PRISCUS,
  CARDINAL,
  REGENT,
  MAGAJI,
  TITLED,
];

const useDeckLibrary = (cardsList, cardsToList) => {
  const limitedLibrary = useSnapshot(limitedStore)[LIBRARY];

  const cardsFrom = Object.values(cardsList);
  const cardsTo = Object.values(cardsToList || {});
  const libraryFrom = cardsFrom.filter((card) => card.q > 0);
  const libraryTo = cardsTo.filter((card) => card.q > 0 && !containCard(libraryFrom, card));
  const libraryFromSide = cardsFrom.filter((card) => card.q <= 0 && !containCard(libraryTo, card));
  const libraryToSide = cardsTo.filter(
    (card) => card.q <= 0 && !containCard(libraryFrom, card) && !containCard(libraryFromSide, card),
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

  const {
    [HAS_BANNED]: hasBanned,
    [HAS_LIMITED]: hasLimited,
    [HAS_PLAYTEST]: hasPlaytest,
  } = getRestrictions(
    { [CRYPT]: {}, [LIBRARY]: cardsList },
    { [CRYPT]: {}, [LIBRARY]: limitedLibrary },
  );

  const trifleTotal = countCards(library.filter((card) => card.c[TRIFLE]));
  const libraryTotal = countCards(cardsFrom);
  const libraryToTotal = countCards(cardsTo);
  const poolTotal = countTotalCost(cardsFrom, POOL);
  const poolToTotal = countTotalCost(cardsTo, POOL);
  const bloodTotal = countTotalCost(cardsFrom, BLOOD);
  const bloodToTotal = countTotalCost(cardsTo, BLOOD);
  const libraryByTypeTotal = getTotalCardsGroupedBy(cardsFrom, TYPE);
  const libraryByTypeToTotal = getTotalCardsGroupedBy(cardsTo, TYPE);
  const libraryByDisciplinesTotal = getTotalCardsGroupedBy(
    library.filter((card) => card.c[DISCIPLINE]),
    DISCIPLINE,
  );

  const libraryByClansTotal = getTotalCardsGroupedBy(
    library.filter((card) => card.c[CLAN] && card.c[TYPE] !== TYPE_MASTER),
    CLAN,
  );

  const libraryByPathsTotal = getTotalCardsGroupedBy(
    library.filter((card) => card.c[PATH] && card.c[TYPE] !== TYPE_MASTER),
    PATH,
  );

  const libraryByTitlesTotal = {};
  const libraryBySectsTotal = {};
  library.forEach((card) => {
    const requirements = card.c[REQUIREMENT].split(",");

    const titleReq = requirements.filter((i) => titlesOpts.includes(i));
    if (titleReq.length !== 0) {
      libraryByTitlesTotal[titleReq] = (libraryByTitlesTotal[titleReq] ?? 0) + card.q;
    }

    const sectReq = requirements.filter((i) => sectsOpts.includes(capitalize(i)));
    sectReq.forEach((sect) => {
      libraryBySectsTotal[sect] = (libraryBySectsTotal[sect] ?? 0) + card.q;
    });
  });

  const anyDisciplines = countCards(
    library.filter((card) => !card.c[CLAN] && !card.c[DISCIPLINE] && card.c[TYPE] !== TYPE_MASTER),
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
    trifleTotal,
    libraryTotal,
    libraryToTotal,
    poolTotal,
    poolToTotal,
    bloodTotal,
    bloodToTotal,
    libraryByTypeTotal,
    libraryByTypeToTotal,
    libraryByClansTotal,
    libraryByPathsTotal,
    libraryBySectsTotal,
    libraryByTitlesTotal,
    libraryByDisciplinesTotal,
  };
};

export default useDeckLibrary;
