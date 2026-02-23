import { useSnapshot } from "valtio";
import cardtypeSorted from "@/assets/data/cardtypeSorted.json";
import disciplinesExtraList from "@/assets/data/disciplinesExtraList.json";
import disciplinesList from "@/assets/data/disciplinesList.json";
import virtuesList from "@/assets/data/virtuesList.json";
import imbuedClansList from "@/assets/data/imbuedClansList.json";
import vampireClansList from "@/assets/data/vampireClansList.json";
import {
  ALL,
  DISCIPLINE,
  CLAN,
  HARD,
  LIBRARY,
  LOGIC,
  NOK,
  NONE,
  OK,
  SOFT,
  SURPLUS,
  SURPLUS_FIXED,
  SURPLUS_USED,
  TYPE,
  VALUE,
  WISHLIST,
} from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getHardTotal, getIsPlaytest, getSoftMax } from "@/utils";

const useInventoryLibrary = (library, category, compact, type, discipline, clan, onlyNotes) => {
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const { libraryCardBase } = useApp();

  const cards = library || {};
  const cardsByType = {};
  const cardsByDiscipline = {};
  const cardsByClan = {};
  const missingByType = {};
  const missingByDiscipline = {};
  const missingByClan = {};
  const surplusByType = {};
  const surplusByDiscipline = {};
  const surplusByClan = {};

  [ALL, ...cardtypeSorted].forEach((i) => {
    cardsByType[i] = {};
    missingByType[i] = {};
    surplusByType[i] = {};
  });

  [ALL, NONE, ...[...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted(), ...Object.keys(virtuesList)].forEach((i) => {
    cardsByDiscipline[i] = {};
    missingByDiscipline[i] = {};
    surplusByDiscipline[i] = {};
  });

  [ALL, NONE, ...vampireClansList, ...imbuedClansList].forEach((i) => {
    cardsByClan[i] = {};
    missingByClan[i] = {};
    surplusByClan[i] = {};
  });

  if (compact) {
    Object.keys(cards).forEach((card) => {
      cardsByType[ALL] = {
        [card]: cards[card],
      };
      cardsByDiscipline[ALL] = {
        [card]: cards[card],
      };
      cardsByClan[ALL] = {
        [card]: cards[card],
      };
    });
  } else {
    Object.keys(cards)
      .filter((cardid) => (onlyNotes ? cards[cardid].t : true))
      .forEach((cardid) => {
        const types = libraryCardBase[cardid][TYPE].split("/");

        let disciplines = [NONE];
        const d = libraryCardBase[cardid][DISCIPLINE];
        if (d.includes("/")) {
          disciplines = d.split("/");
        } else if (d.includes(" & ")) {
          disciplines = d.split(" & ");
        } else if (d) {
          disciplines = [d];
        }

        let clans = [NONE];
        const c = libraryCardBase[cardid][CLAN];
        if (c.includes("/")) {
          clans = c.split("/");
        } else if (c) {
          clans = [c];
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
        const surplusEntry = { q: -miss, c: cards[cardid].c };

        if (
          (category === NOK && miss > 0) ||
          (category === SURPLUS && miss < 0) ||
          [ALL, OK].includes(category)
        ) {
          types.forEach((i) => {
            cardsByType[i][cardid] = cards[cardid];
            if (miss > 0) missingByType[i][cardid] = missEntry;
            if (miss < 0) surplusByType[i][cardid] = surplusEntry;
          });

          disciplines.forEach((i) => {
            cardsByDiscipline[i][cardid] = cards[cardid];
            if (miss > 0) missingByDiscipline[i][cardid] = missEntry;
            if (miss < 0) surplusByDiscipline[i][cardid] = surplusEntry;
          });

          clans.forEach((i) => {
            cardsByClan[i][cardid] = cards[cardid];
            if (miss > 0) missingByClan[i][cardid] = missEntry;
            if (miss < 0) surplusByClan[i][cardid] = surplusEntry;
          });

          cardsByType[ALL][cardid] = cards[cardid];
          cardsByDiscipline[ALL][cardid] = cards[cardid];
          cardsByClan[ALL][cardid] = cards[cardid];
        }

        if (miss > 0) {
          missingByType[ALL][cardid] = missEntry;
          missingByDiscipline[ALL][cardid] = missEntry;
          missingByClan[ALL][cardid] = missEntry;
        }

        if (miss < 0) {
          surplusByType[ALL][cardid] = surplusEntry;
          surplusByDiscipline[ALL][cardid] = surplusEntry;
          surplusByClan[ALL][cardid] = surplusEntry;
        }
      });

    [...Object.keys(usedLibrary[SOFT]), ...Object.keys(usedLibrary[HARD])]
      .filter((cardid) => !(getIsPlaytest(cardid) || cards[cardid]))
      .forEach((cardid) => {
        const types = libraryCardBase[cardid][TYPE].split("/");

        let disciplines = [NONE];
        const d = libraryCardBase[cardid][DISCIPLINE];
        if (d.includes("/")) {
          disciplines = d.split("/");
        } else if (d.includes(" & ")) {
          disciplines = d.split(" & ");
        } else if (d) {
          disciplines = [d];
        }

        let clans = [NONE];
        const c = libraryCardBase[cardid][CLAN];
        if (c.includes("/")) {
          clans = c.split("/");
        } else if (c) {
          clans = [c];
        }

        if (![OK, SURPLUS].includes(category) && !onlyNotes) {
          types.forEach((t) => {
            cardsByType[t][cardid] = { q: 0, c: libraryCardBase[cardid] };
          });

          disciplines.forEach((i) => {
            cardsByDiscipline[i][cardid] = {
              q: 0,
              c: libraryCardBase[cardid],
            };
          });

          clans.forEach((i) => {
            cardsByClan[i][cardid] = {
              q: 0,
              c: libraryCardBase[cardid],
            };
          });

          cardsByType[ALL][cardid] = { q: 0, c: libraryCardBase[cardid] };
          cardsByDiscipline[ALL][cardid] = {
            q: 0,
            c: libraryCardBase[cardid],
          };
          cardsByClan[ALL][cardid] = {
            q: 0,
            c: libraryCardBase[cardid],
          };
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

        clans.forEach((i) => {
          missingByClan[i][cardid] = missEntry;
        });
        missingByClan[ALL][cardid] = missEntry;
      });
  }

  const cardsFilteredByType = {};
  const cardsFilteredByTypeTotal = {};
  const cardsFilteredByTypeUnique = {};
  const cardsFilteredByDiscipline = {};
  const cardsFilteredByDisciplineTotal = {};
  const cardsFilteredByDisciplineUnique = {};
  const cardsFilteredByClan = {};
  const cardsFilteredByClanTotal = {};
  const cardsFilteredByClanUnique = {};
  const missingFiltered = {};
  let missingFilteredTotal = 0;

  if (!compact) {
    Object.keys(cardsByType).forEach(i => {
      cardsFilteredByType[i] = {};
      cardsFilteredByTypeTotal[i] = 0;
      cardsFilteredByTypeUnique[i] = 0;

      Object.keys(cardsByType[i]).forEach(cardid => {
        if (cardsByClan[clan][cardid] && cardsByDiscipline[discipline][cardid]) {
          cardsFilteredByType[i][cardid] = cardsByType[i][cardid];
          cardsFilteredByTypeTotal[i] += cardsByType[i][cardid].q;
          if (cardsByType[i][cardid].q) {
            cardsFilteredByTypeUnique[i] += 1;
          }
        }
      })
    });

    Object.keys(cardsByClan).forEach(i => {
      cardsFilteredByClan[i] = {};
      cardsFilteredByClanTotal[i] = 0;
      cardsFilteredByClanUnique[i] = 0;

      Object.keys(cardsByClan[i]).forEach(cardid => {
        if (cardsByType[type][cardid] && cardsByDiscipline[discipline][cardid]) {
          cardsFilteredByClan[i][cardid] = cardsByClan[i][cardid];
          cardsFilteredByClanTotal[i] += cardsByClan[i][cardid].q;
          if (cardsByClan[i][cardid].q) {
            cardsFilteredByClanUnique[i] += 1;
          }
        }
      })
    });

    Object.keys(cardsByDiscipline).forEach(i => {
      cardsFilteredByDiscipline[i] = {};
      cardsFilteredByDisciplineTotal[i] = 0;
      cardsFilteredByDisciplineUnique[i] = 0;

      Object.keys(cardsByDiscipline[i]).forEach(cardid => {
        if (cardsByType[type][cardid] && cardsByClan[clan][cardid]) {
          cardsFilteredByDiscipline[i][cardid] = cardsByDiscipline[i][cardid];
          cardsFilteredByDisciplineTotal[i] += cardsByDiscipline[i][cardid].q;
          if (cardsByDiscipline[i][cardid].q) {
            cardsFilteredByDisciplineUnique[i] += 1;
          }
        }
      })
    });

    Object.keys(missingByType[type])
      .filter((card) => missingByDiscipline[discipline][card] && missingByClan[clan][card] )
      .forEach((cardid) => {
        missingFiltered[cardid] = missingByType[type][cardid];
        missingFilteredTotal += missingByType[type][cardid].q;
      });
  }

  return {
    cardsByType,
    missingByType,
    surplusByType,
    cardsByDiscipline,
    missingByDiscipline,
    surplusByDiscipline,
    cardsByClan,
    missingByClan,
    surplusByClan,
    cardsFilteredByType,
    cardsFilteredByTypeTotal,
    cardsFilteredByTypeUnique,
    cardsFilteredByDiscipline,
    cardsFilteredByDisciplineTotal,
    cardsFilteredByDisciplineUnique,
    cardsFilteredByClan,
    cardsFilteredByClanTotal,
    cardsFilteredByClanUnique,
    missingFiltered,
    missingFilteredTotal,
  };
};

export default useInventoryLibrary;
