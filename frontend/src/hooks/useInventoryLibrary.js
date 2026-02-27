import { useSnapshot } from "valtio";
import cardtypeSorted from "@/assets/data/cardtypeSorted.json";
import disciplinesExtraList from "@/assets/data/disciplinesExtraList.json";
import disciplinesList from "@/assets/data/disciplinesList.json";
import imbuedClansList from "@/assets/data/imbuedClansList.json";
import vampireClansList from "@/assets/data/vampireClansList.json";
import virtuesList from "@/assets/data/virtuesList.json";
import {
  ALL,
  CARDS,
  CLAN,
  DISCIPLINE,
  HARD,
  LIBRARY,
  NOK,
  NONE,
  OK,
  SOFT,
  SURPLUS,
  TOTAL,
  TYPE,
  UNIQUE,
  WISHLIST,
} from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getIsPlaytest, getMissing } from "@/utils";

const getRequirements = (cardid, cardBase, requirements) => {
  const types = cardBase[cardid][TYPE].split("/");

  let disciplines = [NONE];
  const d = cardBase[cardid][DISCIPLINE];
  if (d.includes("/")) {
    disciplines = d.split("/");
  } else if (d.includes(" & ")) {
    disciplines = d.split(" & ");
  } else if (d) {
    disciplines = [d];
  }

  let clans = [NONE];
  const c = cardBase[cardid][CLAN];
  if (c.includes("/")) {
    clans = c.split("/");
  } else if (c) {
    clans = [c];
  }

  const hasGoodRequirements = !!(
    (clans.includes(requirements[CLAN]) || requirements[CLAN] === ALL) &&
    (disciplines.includes(requirements[DISCIPLINE]) || requirements[DISCIPLINE] === ALL) &&
    (types.includes(requirements[TYPE]) || requirements[TYPE] === ALL)
  );

  return { disciplines, clans, types, hasGoodRequirements };
};

const useInventoryLibrary = (library, category, compact, type, discipline, clan, onlyNotes) => {
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const { libraryCardBase } = useApp();

  const requirements = {
    [CLAN]: clan,
    [DISCIPLINE]: discipline,
    [TYPE]: type,
  };

  const cards = library || {};
  const cardsByType = {};
  const cardsByDiscipline = {};
  const cardsByClan = {};
  const filteredCards = compact ? cards : {};
  const missing = {};
  let missingTotal = 0;
  const surplus = {};

  [ALL, ...cardtypeSorted].forEach((i) => {
    cardsByType[i] = {};
  });

  [
    ALL,
    NONE,
    ...[...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted(),
    ...Object.keys(virtuesList),
  ].forEach((i) => {
    cardsByDiscipline[i] = {};
  });

  [ALL, NONE, ...vampireClansList, ...imbuedClansList].forEach((i) => {
    cardsByClan[i] = {};
  });

  if (!compact) {
    Object.keys(cards)
      .filter((cardid) => (onlyNotes ? cards[cardid].t : true))
      .forEach((cardid) => {
        const { types, disciplines, clans, hasGoodRequirements } = getRequirements(
          cardid,
          libraryCardBase,
          requirements,
        );
        const miss = getMissing(cardid, usedLibrary, wishlist, cards[cardid].q);

        if (
          (category === NOK && miss > 0) ||
          (category === SURPLUS && miss < 0) ||
          [ALL, OK].includes(category)
        ) {
          if (hasGoodRequirements) {
            if (miss > 0) missing[cardid] = { q: miss, c: libraryCardBase[cardid] };
            if (miss < 0) surplus[cardid] = { q: -miss, c: libraryCardBase[cardid] };
            filteredCards[cardid] = cards[cardid];
          }

          types.forEach((i) => {
            cardsByType[i][cardid] = cards[cardid];
          });

          disciplines.forEach((i) => {
            cardsByDiscipline[i][cardid] = cards[cardid];
          });

          clans.forEach((i) => {
            cardsByClan[i][cardid] = cards[cardid];
          });

          cardsByType[ALL][cardid] = cards[cardid];
          cardsByDiscipline[ALL][cardid] = cards[cardid];
          cardsByClan[ALL][cardid] = cards[cardid];
        }
      });

    [...Object.keys(usedLibrary[SOFT]), ...Object.keys(usedLibrary[HARD])]
      .filter((cardid) => !(getIsPlaytest(cardid) || cards[cardid]))
      .forEach((cardid) => {
        const { types, disciplines, clans, hasGoodRequirements } = getRequirements(
          cardid,
          libraryCardBase,
          requirements,
        );

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

        if (hasGoodRequirements) {
          missing[cardid] = {
            q: getMissing(cardid, usedLibrary, wishlist),
            c: libraryCardBase[cardid],
          };
          filteredCards[cardid] = { q: 0, c: libraryCardBase[cardid] };
        }
      });

    Object.values(missing).forEach((i) => {
      missingTotal += i.q;
    });
  }

  const cardsFilteredBy = {
    [TYPE]: {},
    [DISCIPLINE]: {},
    [CLAN]: {},
  };

  if (!compact) {
    Object.keys(cardsByType).forEach((i) => {
      cardsFilteredBy[TYPE][i] = {
        [CARDS]: {},
        [TOTAL]: 0,
        [UNIQUE]: 0,
      };
      Object.keys(cardsByType[i]).forEach((cardid) => {
        if (cardsByClan[clan][cardid] && cardsByDiscipline[discipline][cardid]) {
          cardsFilteredBy[TYPE][i][CARDS][cardid] = cardsByType[i][cardid];
          cardsFilteredBy[TYPE][i][TOTAL] += cardsByType[i][cardid].q;
          if (cardsByType[i][cardid].q) {
            cardsFilteredBy[TYPE][i][UNIQUE] += 1;
          }
        }
      });
    });

    Object.keys(cardsByClan).forEach((i) => {
      cardsFilteredBy[CLAN][i] = {
        [CARDS]: {},
        [TOTAL]: 0,
        [UNIQUE]: 0,
      };
      Object.keys(cardsByClan[i]).forEach((cardid) => {
        if (cardsByType[type][cardid] && cardsByDiscipline[discipline][cardid]) {
          cardsFilteredBy[CLAN][i][CARDS][cardid] = cardsByClan[i][cardid];
          cardsFilteredBy[CLAN][i][TOTAL] += cardsByClan[i][cardid].q;
          if (cardsByClan[i][cardid].q) {
            cardsFilteredBy[CLAN][i][UNIQUE] += 1;
          }
        }
      });
    });

    Object.keys(cardsByDiscipline).forEach((i) => {
      cardsFilteredBy[DISCIPLINE][i] = {
        [CARDS]: {},
        [TOTAL]: 0,
        [UNIQUE]: 0,
      };
      Object.keys(cardsByDiscipline[i]).forEach((cardid) => {
        if (cardsByClan[clan][cardid] && cardsByType[type][cardid]) {
          cardsFilteredBy[DISCIPLINE][i][CARDS][cardid] = cardsByDiscipline[i][cardid];
          cardsFilteredBy[DISCIPLINE][i][TOTAL] += cardsByDiscipline[i][cardid].q;
          if (cardsByDiscipline[i][cardid].q) {
            cardsFilteredBy[DISCIPLINE][i][UNIQUE] += 1;
          }
        }
      });
    });
  }

  return {
    cardsByType,
    cardsByDiscipline,
    cardsByClan,
    cardsFilteredBy,
    filteredCards,
    missing,
    missingTotal,
    surplus,
  };
};

export default useInventoryLibrary;
