import { CARD_TEXT, MASTER, ID } from '@/utils/constants';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

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
      ? Object.keys(card.c.Disciplines).length
      : Object.keys(card.Disciplines).length;
    if (acc > n) return acc;
    return n;
  });
};

export const countTotalCost = (cardsList, type) => {
  if (!cardsList.length) return 0;
  return cardsList
    .filter((card) => !isNaN(card.c[type]))
    .reduce((acc, card) => acc + card.q * card.c[type], 0);
};

export const isTrifle = (card) => {
  const text = card[CARD_TEXT].toLowerCase();
  return (
    card.Type === MASTER &&
    (text.includes('trifle') ||
      text.includes('nimiedad') ||
      text.includes('triviale'))
  );
};

export const getLegality = (card) => {
  const sets = Object.keys(card.Set).filter((s) => s !== 'PLAYTEST');
  if (sets.length > 1 || ['POD', 'Promo'].includes(sets[0])) return false;
  if (sets.length == 0) return 'PLAYTEST';

  const MS_TO_DAYS = 1000 * 60 * 60 * 24;
  const setDate = new Date(setsAndPrecons[sets[0]].date);
  const now = new Date();
  if ((now - setDate) / MS_TO_DAYS > 30) return false;
  setDate.setDate(setDate.getDate() + 30);
  const dateIso = setDate.toISOString().split('T')[0];
  return dateIso;
};

export const getTotalCardsGroupedBy = (cards, property) => {
  const propertyList = [
    ...new Set(cards.map((card) => getCardProperty(card, property))),
  ];
  const resultObject = {};
  propertyList.map(
    (propertyIndex) =>
      (resultObject[propertyIndex] = countCards(
        cards.filter(
          (card) => getCardProperty(card, property) === propertyIndex
        )
      ))
  );

  return resultObject;
};

export const getCardsGroupedBy = (cards, property) => {
  const propertyList = [
    ...new Set(cards.map((card) => getCardProperty(card, property))),
  ];
  const resultObject = {};
  propertyList.map(
    (propertyIndex) =>
      (resultObject[propertyIndex] = cards.filter(
        (card) => getCardProperty(card, property) === propertyIndex
      ))
  );

  return resultObject;
};

export const containCard = (cards, card) => {
  return cards
    .map((c) => getCardProperty(c, ID))
    .includes(getCardProperty(card, ID));
};

export const getHardTotal = (hardList) => {
  if (!hardList) return 0;

  return Object.values(hardList).reduce((acc, q) => (acc += q), 0);
};

export const getSoftMax = (softList) => {
  if (!softList) return 0;

  return Object.values(softList).reduce((acc, q) => (acc = q > acc ? q : acc));
};

export const getCardsArray = (cardsList) => {
  const cryptArr = [];
  Object.keys(cardsList).map((card) => {
    for (let i = 0; i < cardsList[card].q; i++) {
      cryptArr.push(cardsList[card].c);
    }
  });
  return cryptArr;
};

export const getClan = (crypt) => {
  const clans = {};

  Object.values(crypt)
    .filter((card) => card.c.Name !== 'Anarch Convert')
    .map((card) => {
      const clan = card.c.Clan;
      if (clans[clan]) {
        clans[clan] += card.q;
      } else {
        clans[clan] = card.q;
      }
    });

  const topClan = Object.keys(clans).reduce(
    (acc, c) => {
      const t = acc.t + clans[c];

      if (clans[c] > acc.q) {
        return { clan: c, q: clans[c], t: t };
      } else {
        return { ...acc, t: t };
      }
    },
    { clan: null, q: 0, t: 0 }
  );

  if (topClan.q / topClan.t > 0.5) {
    return topClan.clan;
  } else {
    return null;
  }
};

export const getSect = (crypt) => {
  const sects = {};

  Object.values(crypt)
    .filter((card) => card.c.Name !== 'Anarch Convert')
    .map((card) => {
      const sect = card.c.Sect;
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
      } else {
        return { ...acc, t: t };
      }
    },
    { sect: null, q: 0, t: 0 }
  );

  if (topSect.q / topSect.t > 0.65) {
    return topSect.sect;
  } else {
    return null;
  }
};

export const deepClone = (v) => JSON.parse(JSON.stringify(v));
