import { useMemo } from "react";
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
  POOL,
  TRIFLE,
  TYPE,
  TYPE_EVENT,
  TYPE_MASTER,
} from "@/constants";
import { useSnapshot } from "valtio";
import { limitedStore } from "@/context";
import {
  containCard,
  countCards,
  countTotalCost,
  getRestrictions,
  getTotalCardsGroupedBy,
  librarySort,
} from "@/utils";

const useDeckLibrary = (cardsList, cardsToList) => {
  const limitedLibrary = useSnapshot(limitedStore)[LIBRARY];

  return useMemo(() => {
    const cardsFrom = Object.values(cardsList);
    const cardsTo = Object.values(cardsToList || {});
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

    const {
      [HAS_BANNED]: hasBanned,
      [HAS_LIMITED]: hasLimited,
      [HAS_PLAYTEST]: hasPlaytest,
    } = getRestrictions(
      { [CRYPT]: {}, [LIBRARY]: library },
      { [CRYPT]: {}, [LIBRARY]: limitedLibrary },
    );

    const trifleTotal = countCards(library.filter((card) => card.c[TRIFLE]));
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
      library.filter(
        (card) => card.c[CLAN] && card.c[TYPE] !== TYPE_MASTER && card.c[TYPE] !== TYPE_EVENT,
      ),
      CLAN,
    );
    const anyDisciplines = countCards(
      library.filter(
        (card) =>
          !card.c[CLAN] &&
          !card.c[DISCIPLINE] &&
          card.c[TYPE] !== TYPE_MASTER &&
          card.c[TYPE] !== TYPE_EVENT,
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
  }, [cardsList, cardsToList, limitedLibrary]);
};

export default useDeckLibrary;
