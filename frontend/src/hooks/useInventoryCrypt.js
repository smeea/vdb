import { useSnapshot } from "valtio";
import imbuedClansList from "@/assets/data/imbuedClansList.json";
import vampireClansList from "@/assets/data/vampireClansList.json";
import {
  ALL,
  CLAN,
  CRYPT,
  HARD,
  LOGIC,
  NOK,
  OK,
  SOFT,
  SURPLUS_FIXED,
  SURPLUS_USED,
  VALUE,
  WISHLIST,
} from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getHardTotal, getIsPlaytest, getSoftMax } from "@/utils";

const useInventoryCrypt = (crypt, category, compact, onlyNotes) => {
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const { cryptCardBase } = useApp();

  const cards = crypt || {};
  const cardsByClan = {};
  const cardsByClanTotal = {};
  const cardsByClanUnique = {};
  const missingByClan = {};
  const missingByClanTotal = {};

  const clansSorted = [ALL, ...vampireClansList, ...imbuedClansList];
  clansSorted.forEach((clan) => {
    cardsByClan[clan] = {};
    cardsByClanTotal[clan] = 0;
    cardsByClanUnique[clan] = 0;
    missingByClan[clan] = {};
    missingByClanTotal[clan] = 0;
  });

  if (compact) {
    Object.keys(cards).forEach((cardid) => {
      cardsByClan[ALL] = {
        card: cards[cardid],
      };
    });
  } else {
    Object.keys(cards)
      .filter((cardid) => (onlyNotes ? cards[cardid].t : true))
      .forEach((cardid) => {
        const clan = cards[cardid].c[CLAN];

        const wishlistLogic = wishlist[cardid]?.[LOGIC];
        const wishlistValue = wishlist[cardid]?.[VALUE];
        let miss;
        switch (wishlistLogic) {
          case SURPLUS_FIXED:
            miss = wishlistValue - cards[cardid].q;
            break;
          case SURPLUS_USED:
            {
              const softUsedMax = getSoftMax(usedCrypt[SOFT][cardid]);
              const hardUsedTotal = getHardTotal(usedCrypt[HARD][cardid]);
              miss = softUsedMax + hardUsedTotal + wishlistValue - cards[cardid].q;
            }
            break;
          default: {
            const softUsedMax = getSoftMax(usedCrypt[SOFT][cardid]);
            const hardUsedTotal = getHardTotal(usedCrypt[HARD][cardid]);
            miss = softUsedMax + hardUsedTotal - cards[cardid].q;
          }
        }

        if (miss > 0) {
          missingByClan[clan][cardid] = { q: miss, c: cards[cardid].c };
          missingByClan[ALL][cardid] = {
            q: miss,
            c: cards[cardid].c,
          };
        }

        if (category === NOK) {
          if (miss > 0) {
            cardsByClan[clan][cardid] = cards[cardid];
            cardsByClan[ALL][cardid] = cards[cardid];
          }
        } else {
          cardsByClan[clan][cardid] = cards[cardid];
          cardsByClan[ALL][cardid] = cards[cardid];
        }
      });
    [...Object.keys(usedCrypt[SOFT]), ...Object.keys(usedCrypt[HARD])]
      .filter((cardid) => !(getIsPlaytest(cardid) || cards[cardid]))
      .forEach((cardid) => {
        const clan = cryptCardBase[cardid][CLAN];

        if (category !== OK && !onlyNotes) {
          cardsByClan[clan][cardid] = {
            q: 0,
            c: cryptCardBase[cardid],
          };
          cardsByClan[ALL][cardid] = {
            q: 0,
            c: cryptCardBase[cardid],
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
              const softUsedMax = getSoftMax(usedCrypt[SOFT]?.[cardid]);
              const hardUsedTotal = getHardTotal(usedCrypt[HARD]?.[cardid]);
              miss = softUsedMax + hardUsedTotal + wishlistValue;
            }
            break;
          default: {
            const softUsedMax = getSoftMax(usedCrypt[SOFT]?.[cardid]);
            const hardUsedTotal = getHardTotal(usedCrypt[HARD]?.[cardid]);
            miss = softUsedMax + hardUsedTotal;
          }
        }

        const missEntry = {
          q: miss,
          c: cryptCardBase[cardid],
        };

        missingByClan[clan][cardid] = missEntry;
        missingByClan[ALL][cardid] = missEntry;
      });

    Object.keys(missingByClan).forEach((clan) => {
      Object.values(missingByClan[clan]).forEach((card) => {
        missingByClanTotal[clan] += card.q;
      });
    });
  }

  if (!compact) {
    Object.keys(cardsByClan).forEach((c) => {
      cardsByClanTotal[c] = 0;
      cardsByClanUnique[c] = 0;
    });

    Object.keys(cardsByClan).forEach((c) => {
      Object.keys(cardsByClan[c]).forEach((cardid) => {
        cardsByClanTotal[c] += cardsByClan[c][cardid].q;
        if (cardsByClan[c][cardid].q) {
          cardsByClanUnique[c] += 1;
        }
      });
    });
  }

  return {
    cardsByClan,
    cardsByClanTotal,
    cardsByClanUnique,
    missingByClan,
    missingByClanTotal,
  };
};

export default useInventoryCrypt;
