import dayjs from "dayjs";
import disciplinesList from "@/assets/data/disciplinesList.json";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import virtuesList from "@/assets/data/virtuesList.json";
import {
  ANY,
  BANNED,
  CLAN,
  CRYPT,
  DATE,
  DISCIPLINES,
  GROUP,
  HAS_BANNED,
  HAS_LIMITED,
  HAS_PLAYTEST,
  ID,
  IS_AUTHOR,
  IS_FROZEN,
  IS_NON_EDITABLE,
  IS_PUBLIC,
  LIBRARY,
  NAME,
  PATH,
  PLAYTEST,
  POD,
  PROMO,
  SECT,
  SET,
} from "@/constants";

export const getCardProperty = (card, property) => {
  return card.c ? card.c[property] : card[property];
};

export const initialize = (array, index, value) => {
  if (array[index] === null || array[index] === undefined) {
    array[index] = value;
  }
};

export const countCards = (cardsList) => {
  if (!cardsList.length) return 0;
  return cardsList.reduce((acc, card) => acc + card.q, 0);
};

export const countDisciplines = (cardsList) => {
  if (!cardsList.length) return 0;
  return cardsList.reduce((acc, card) => {
    const n = card.c
      ? Object.keys(card.c[DISCIPLINES]).length
      : Object.keys(card[DISCIPLINES]).length;
    if (acc > n) return acc;
    return n;
  });
};

export const countTotalCost = (cardsList, type) => {
  if (!cardsList.length) return 0;
  return cardsList
    .filter((card) => Number.isInteger(card.c[type]))
    .reduce((acc, card) => acc + card.q * card.c[type], 0);
};

export const getRestrictions = (deck, limitedCards) => {
  if (!deck) return {};

  let hasPlaytest;
  let hasBanned;
  let hasLimited = null;
  [...Object.values(deck[CRYPT]), ...Object.values(deck[LIBRARY])].forEach((card) => {
    if (card.q < 1) return;
    if (card.c[BANNED]) hasBanned = true;
    if (
      limitedCards &&
      ![...Object.keys(limitedCards[CRYPT]), ...Object.keys(limitedCards[LIBRARY])].includes(
        card.c[ID].toString(),
      )
    ) {
      hasLimited += card.q;
    }

    const legalRestriction = getLegality(card.c);
    if (legalRestriction === PLAYTEST) {
      hasPlaytest = true;
    }
  });

  return {
    [HAS_BANNED]: hasBanned,
    [HAS_LIMITED]: hasLimited,
    [HAS_PLAYTEST]: hasPlaytest,
  };
};

export const getLegality = (card) => {
  const sets = Object.keys(card[SET]).filter((s) => s !== PLAYTEST);
  if (sets.length > 1 || [POD, PROMO].includes(sets[0])) return false;
  if (sets.length === 0) return PLAYTEST;

  const setDate = dayjs(setsAndPrecons[sets[0]][DATE]);
  if (dayjs().diff(setDate, "day") >= 0) return false;
  const legalDate = setsAndPrecons[sets[0]][DATE];
  return legalDate;
};

export const getGroups = (cards) => {
  const cryptGroupMin = cards
    .filter((card) => card.c[GROUP] !== ANY)
    .reduce((acc, card) => (card.c[GROUP] < acc ? card.c[GROUP] : acc), 10);

  const cryptGroupMax = cards
    .filter((card) => card.c[GROUP] !== ANY)
    .reduce((acc, card) => (card.c[GROUP] > acc ? card.c[GROUP] : acc), 0);

  if (cryptGroupMax - cryptGroupMin === 1) {
    return { cryptGroups: `${cryptGroupMin}-${cryptGroupMax}` };
  }
  if (cryptGroupMax - cryptGroupMin === 0) {
    return { cryptGroups: cryptGroupMax };
  }

  return { hasWrongGroups: true };
};

export const getTotalCardsGroupedBy = (cards, property) => {
  const groupedCards = Object.groupBy(cards, (card) => {
    return card.c[property];
  });
  const resultObject = {};
  Object.entries(groupedCards).forEach(([k, v]) => {
    resultObject[k] = countCards(v);
  });
  return resultObject;
};

export const getCardsGroupedBy = (cards, property) => {
  return Object.groupBy(cards, (card) => card.c[property]);
};

export const containCard = (cards, card) => {
  return cards.map((c) => getCardProperty(c, ID)).includes(getCardProperty(card, ID));
};

export const getHardTotal = (hardList) => {
  if (!hardList) return 0;

  return Object.values(hardList).reduce((acc, q) => acc + q, 0);
};

export const getSoftMax = (softList) => {
  if (!softList) return 0;

  return Object.values(softList).reduce((acc, q) => (q > acc ? q : acc));
};

export const getCardsArray = (cardsList) => {
  const cryptArr = [];
  Object.keys(cardsList).forEach((card) => {
    for (let i = 0; i < cardsList[card].q; i++) {
      cryptArr.push(cardsList[card].c);
    }
  });
  return cryptArr;
};

export const getClan = (crypt) => {
  const clans = {};

  Object.values(crypt)
    .filter((card) => card.c[NAME] !== "Anarch Convert")
    .forEach((card) => {
      [card.c[CLAN], card.c[PATH]].forEach((c) => {
        if (!c) return;
        if (clans[c]) {
          clans[c] += card.q;
        } else {
          clans[c] = card.q;
        }
      });
    });

  const topClan = Object.keys(clans).reduce(
    (acc, c) => {
      const t = acc.t + clans[c];

      if (clans[c] > acc.q) {
        return { clan: c, q: clans[c], t: t };
      }
      acc[t] = t;
      return acc;
    },
    { clan: null, q: 0, t: 0 },
  );

  if (topClan.q / topClan.t > 0.5) return topClan[CLAN];
  return null;
};

export const getSect = (crypt) => {
  const sects = {};

  Object.values(crypt)
    .filter((card) => card.c[NAME] !== "Anarch Convert")
    .forEach((card) => {
      const sect = card.c[SECT];
      if (sects[sect]) {
        sects[sect] += card.q;
      } else {
        sects[sect] = card.q;
      }
    });

  const topSect = Object.keys(sects).reduce(
    (acc, c) => {
      const t = acc.t + sects[c];
      if (sects[c] > acc.q) {
        return { sect: c, q: sects[c], t: t };
      }
      acc[t] = t;
      return acc;
    },
    { sect: null, q: 0, t: 0 },
  );

  if (topSect.q / topSect.t > 0.65) {
    return topSect.sect;
  }
  return null;
};

export const getSwipedBg = (isSwiped, inInventory) => {
  if (isSwiped) {
    return isSwiped === "right"
      ? "bg-bgSuccess dark:bg-bgSuccessDark"
      : "bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark";
  }
  return inInventory
    ? ""
    : "odd:bg-bgPrimary odd:dark:bg-bgPrimaryDark even:bg-bgThird even:dark:bg-bgThirdDark print:even:dark:bg-bgThird print:odd:dark:bg-bgPrimary";
};

export const deepClone = (v) => JSON.parse(JSON.stringify(v));
export const capitalize = (v) => {
  if (!v) return;
  return v.charAt(0).toUpperCase() + v.slice(1);
};

export const getTextDisciplines = (disciplines) => {
  const disciplinesAndVirtues = { ...disciplinesList, ...virtuesList };

  const baseDisciplines = [];
  const supDisciplines = [];
  Object.keys(disciplines).forEach((d) => {
    if (disciplines[d] === 1) {
      baseDisciplines.push(disciplinesAndVirtues[d].toLowerCase());
    } else {
      supDisciplines.push(disciplinesAndVirtues[d].toUpperCase());
    }
  });

  return [...supDisciplines, ...baseDisciplines].join(" ");
};

export const parseDeckHash = (hash, cryptCardBase, libraryCardBase) => {
  const crypt = {};
  const library = {};

  hash
    .slice(1)
    .split(";")
    .forEach((i) => {
      const j = i.split("=");
      if (j[0] > 200000) {
        crypt[j[0]] = {
          q: Number.parseInt(j[1]),
          c: cryptCardBase[j[0]],
        };
      } else {
        library[j[0]] = {
          q: Number.parseInt(j[1]),
          c: libraryCardBase[j[0]],
        };
      }
    });
  return { crypt, library };
};

export const getIsEditable = (deck) => {
  if (!deck) return null;
  return deck[IS_AUTHOR] && !deck[IS_PUBLIC] && !deck[IS_FROZEN] && !deck[IS_NON_EDITABLE];
};

export const getIsPlaytest = (cardid) => {
  return cardid > 210000 || (cardid < 200000 && cardid > 110000);
};
