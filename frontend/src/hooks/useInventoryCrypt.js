import { useSnapshot } from "valtio";
import imbuedClansList from "@/assets/data/imbuedClansList.json";
import vampireClansList from "@/assets/data/vampireClansList.json";
import {
  ALL,
  CLAN,
  CRYPT,
  HARD,
  NOK,
  OK,
  SOFT,
  SURPLUS,
  CARDS,
  WISHLIST,
  TOTAL,
  UNIQUE
} from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getMissing, getIsPlaytest } from "@/utils";

const getRequirements = (cardid, cardBase, requirements) => {
  const clan = cardBase[cardid][CLAN]

  const hasGoodRequirements = !!(clan === requirements[CLAN] || requirements[CLAN] === ALL)
  return { clan, hasGoodRequirements }
}

const useInventoryCrypt = (crypt, category, compact, clan, onlyNotes) => {
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const { cryptCardBase } = useApp();

  const requirements = {
    [CLAN]: clan,
  }

  const cards = crypt || {};
  const cardsByClan = {};
  const filteredCards = {}
  const missing = {};
  let missingTotal = 0
  const surplus = {};

  [ALL, ...vampireClansList, ...imbuedClansList].forEach((i) => {
    cardsByClan[i] = {};
  });

  if (compact) {
    filteredCards = cards
  } else {
    Object.keys(cards)
      .filter((cardid) => (onlyNotes ? cards[cardid].t : true))
      .forEach((cardid) => {
        const { clan, hasGoodRequirements } = getRequirements(cardid, cryptCardBase, requirements)
        const miss = getMissing(cardid, usedCrypt, wishlist)

        if (
          (category === NOK && miss > 0) ||
          (category === SURPLUS && miss < 0) ||
          [ALL, OK].includes(category)
        ) {

          if (hasGoodRequirements) {
            if (miss > 0) missing[cardid] = { q: miss, c: cryptCardBase[cardid] };
            if (miss < 0) surplus[cardid] = { q: -miss, c: cryptCardBase[cardid] };
            filteredCards[cardid] = cards[cardid]
          }

          cardsByClan[clan][cardid] = cards[cardid];
          cardsByClan[ALL][cardid] = cards[cardid];
        }
      });

    [...Object.keys(usedCrypt[SOFT]), ...Object.keys(usedCrypt[HARD])]
      .filter((cardid) => !(getIsPlaytest(cardid) || cards[cardid]))
      .forEach((cardid) => {
        const { clan, hasGoodRequirements } = getRequirements(cardid, cryptCardBase, requirements)

        if (![OK, SURPLUS].includes(category) && !onlyNotes) {
          cardsByClan[clan][cardid] = {
            q: 0,
            c: cryptCardBase[cardid],
          };
          cardsByClan[ALL][cardid] = {
            q: 0,
            c: cryptCardBase[cardid],
          };
        }

        if (hasGoodRequirements) {
          missing[cardid] = { q: getMissing(cardid, usedCrypt, wishlist), c: cryptCardBase[cardid] };
          filteredCards[cardid] = { q: 0, c: cryptCardBase[cardid]}
        }
      });

    Object.values(missing).forEach((i) => {
      missingTotal += i.q;
    });
  }

  const cardsFilteredBy = {
    [CLAN]: {}
  };

  if (!compact) {
    Object.keys(cardsByClan).forEach((i) => {
      cardsFilteredBy[CLAN][i] = {
        [CARDS]: {},
        [TOTAL]: 0,
        [UNIQUE]: 0
      };

      Object.keys(cardsByClan[i]).forEach(cardid => {
        cardsFilteredBy[CLAN][i][CARDS][cardid] = cardsByClan[i][cardid];
        cardsFilteredBy[CLAN][i][TOTAL] += cardsByClan[i][cardid].q;
        if (cardsByClan[i][cardid].q) {
          cardsFilteredBy[CLAN][i][UNIQUE] += 1;
        }
      })
    });
  }

  return {
    cardsByClan,
    cardsFilteredBy,
    filteredCards,
    missing,
    missingTotal,
  };
};

export default useInventoryCrypt;
