import { useSnapshot } from "valtio";
import cardtypeSorted from "@/assets/data/cardtypeSorted.json";
import disciplinesExtraList from "@/assets/data/disciplinesExtraList.json";
import disciplinesList from "@/assets/data/disciplinesList.json";
import virtuesList from "@/assets/data/virtuesList.json";
import {
  ALL,
  DISCIPLINE,
  HARD,
  LIBRARY,
  LOGIC,
  NOK,
  NONE,
  OK,
  SOFT,
  SURPLUS_FIXED,
  SURPLUS_USED,
  TYPE,
  VALUE,
  WISHLIST,
} from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getHardTotal, getIsPlaytest, getSoftMax } from "@/utils";

const useInventoryLibrary = (library, category, compact, type, discipline, onlyNotes) => {
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const { libraryCardBase } = useApp();

  const cards = library || {};
  const cardsByType = {};
  const cardsByDiscipline = {};
  const missingByType = {};
  const missingByDiscipline = {};

  const typesSorted = [ALL, ...cardtypeSorted];
  typesSorted.forEach((i) => {
    cardsByType[i] = {};
    missingByType[i] = {};
  });

  const disciplines = [...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted();
  [ALL, NONE, ...disciplines, ...Object.keys(virtuesList)].forEach((i) => {
    cardsByDiscipline[i] = {};
    missingByDiscipline[i] = {};
  });

  if (compact) {
    Object.keys(cards).forEach((card) => {
      cardsByType[ALL] = {
        [card]: cards[card],
      };
      cardsByDiscipline[ALL] = {
        [card]: cards[card],
      };
    });
  } else {
    Object.keys(cards)
      .filter((cardid) => (onlyNotes ? cards[cardid].t : true))
      .forEach((cardid) => {
        const types = cards[cardid].c[TYPE].split("/");
        const d = libraryCardBase[cardid][DISCIPLINE];
        let disciplines = [NONE];
        if (d.includes("/")) {
          disciplines = d.split("/");
        } else if (d.includes(" & ")) {
          disciplines = d.split(" & ");
        } else if (d) {
          disciplines = [d];
        }

        const wishlistLogic = wishlist[cardid]?.[LOGIC];
        const wishlistValue = wishlist[cardid]?.[VALUE];
        let miss;
        switch (wishlistLogic) {
          case SURPLUS_FIXED:
            miss = wishlistValue - cards[cardid].q;
            break;
          case SURPLUS_USED:
            {
              const softUsedMax = getSoftMax(usedLibrary[SOFT][cardid]);
              const hardUsedTotal = getHardTotal(usedLibrary[HARD][cardid]);
              miss = softUsedMax + hardUsedTotal + wishlistValue - cards[cardid].q;
            }
            break;
          default: {
            const softUsedMax = getSoftMax(usedLibrary[SOFT][cardid]);
            const hardUsedTotal = getHardTotal(usedLibrary[HARD][cardid]);
            miss = softUsedMax + hardUsedTotal - cards[cardid].q;
          }
        }

        const missEntry = { q: miss, c: cards[cardid].c };

        if ((category === NOK && miss > 0) || category !== NOK) {
          types.forEach((t) => {
            cardsByType[t][cardid] = cards[cardid];
            if (miss > 0) missingByType[t][cardid] = missEntry;
          });

          disciplines.forEach((i) => {
            cardsByDiscipline[i][cardid] = cards[cardid];
            if (miss > 0) missingByDiscipline[i][cardid] = missEntry;
          });

          cardsByType[ALL][cardid] = cards[cardid];
          cardsByDiscipline[ALL][cardid] = cards[cardid];
        }

        if (miss > 0) {
          missingByType[ALL][cardid] = missEntry;
          missingByDiscipline[ALL][cardid] = missEntry;
        }
      });

    [...Object.keys(usedLibrary[SOFT]), ...Object.keys(usedLibrary[HARD])]
      .filter((cardid) => !(getIsPlaytest(cardid) || cards[cardid]))
      .forEach((cardid) => {
        const types = libraryCardBase[cardid][TYPE].split("/");
        const d = libraryCardBase[cardid][DISCIPLINE];
        let disciplines = [NONE];
        if (d.includes("/")) {
          disciplines = d.split("/");
        } else if (d.includes(" & ")) {
          disciplines = d.split(" & ");
        } else if (d) {
          disciplines = [d];
        }

        if (category !== OK && !onlyNotes) {
          types.forEach((t) => {
            cardsByType[t][cardid] = { q: 0, c: libraryCardBase[cardid] };
          });
          cardsByType[ALL][cardid] = { q: 0, c: libraryCardBase[cardid] };
          cardsByDiscipline[ALL][cardid] = {
            q: 0,
            c: libraryCardBase[cardid],
          };

          if (disciplines) {
            disciplines.forEach((i) => {
              cardsByDiscipline[i][cardid] = {
                q: 0,
                c: libraryCardBase[cardid],
              };
            });
          } else {
            cardsByDiscipline[NONE][cardid] = {
              q: 0,
              c: libraryCardBase[cardid],
            };
          }
        }

        const wishlistLogic = wishlist[cardid]?.[LOGIC];
        const wishlistValue = wishlist[cardid]?.[VALUE];
        let miss;
        switch (wishlistLogic) {
          case SURPLUS_FIXED:
            miss = wishlistValue;
            break;
          case SURPLUS_USED:
            {
              const softUsedMax = getSoftMax(usedLibrary[SOFT]?.[cardid]);
              const hardUsedTotal = getHardTotal(usedLibrary[HARD]?.[cardid]);
              miss = softUsedMax + hardUsedTotal + wishlistValue;
            }
            break;
          default: {
            const softUsedMax = getSoftMax(usedLibrary[SOFT]?.[cardid]);
            const hardUsedTotal = getHardTotal(usedLibrary[HARD]?.[cardid]);
            miss = softUsedMax + hardUsedTotal;
          }
        }

        const missEntry = {
          q: miss,
          c: libraryCardBase[cardid],
        };

        types.forEach((t) => {
          missingByType[t][cardid] = missEntry;
        });
        missingByType[ALL][cardid] = missEntry;

        disciplines.forEach((i) => {
          missingByDiscipline[i][cardid] = missEntry;
        });

        missingByDiscipline[ALL][cardid] = missEntry;
      });
  }

  const cardsFilteredByType = {};
  const cardsFilteredByTypeTotal = {};
  const cardsFilteredByTypeUnique = {};
  const cardsFilteredByDiscipline = {};
  const cardsFilteredByDisciplineTotal = {};
  const cardsFilteredByDisciplineUnique = {};
  const missingFiltered = {};
  let missingFilteredTotal = 0;

  if (!compact) {
    Object.keys(cardsByDiscipline).forEach((d) => {
      cardsFilteredByType[d] = {};
      cardsFilteredByTypeTotal[d] = 0;
      cardsFilteredByTypeUnique[d] = 0;
    });

    Object.keys(cardsByType[type]).forEach((cardid) => {
      Object.keys(cardsByDiscipline).forEach((d) => {
        if (cardsByDiscipline[d][cardid]) {
          cardsFilteredByType[d][cardid] = cardsByDiscipline[d][cardid];
          cardsFilteredByTypeTotal[d] += cardsByDiscipline[d][cardid].q;
          if (cardsByDiscipline[d][cardid].q) {
            cardsFilteredByTypeUnique[d] += 1;
          }
        }
      });
    });

    Object.keys(cardsByType).forEach((t) => {
      cardsFilteredByDiscipline[t] = {};
      cardsFilteredByDisciplineTotal[t] = 0;
      cardsFilteredByDisciplineUnique[t] = 0;
    });

    Object.keys(cardsByDiscipline[discipline]).forEach((cardid) => {
      Object.keys(cardsByType).forEach((t) => {
        if (cardsByType[t][cardid]) {
          cardsFilteredByDiscipline[t][cardid] = cardsByType[t][cardid];
          cardsFilteredByDisciplineTotal[t] += cardsByType[t][cardid].q;
          if (cardsByType[t][cardid].q) {
            cardsFilteredByDisciplineUnique[t] += 1;
          }
        }
      });
    });

    Object.keys(missingByType[type])
      .filter((card) => missingByDiscipline[discipline][card])
      .forEach((cardid) => {
        missingFiltered[cardid] = missingByType[type][cardid];
        missingFilteredTotal += missingByType[type][cardid].q;
      });
  }

  return {
    cardsByType,
    missingByType,
    cardsByDiscipline,
    missingByDiscipline,
    cardsFilteredByType,
    cardsFilteredByTypeTotal,
    cardsFilteredByTypeUnique,
    cardsFilteredByDiscipline,
    cardsFilteredByDisciplineTotal,
    cardsFilteredByDisciplineUnique,
    missingFiltered,
    missingFilteredTotal,
  };
};

export default useInventoryLibrary;
