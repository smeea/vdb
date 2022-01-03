import { CARD_TEXT, MASTER, ID } from 'utils/constants';

export const getCardProperty = (card, property) => {
  return card.c ? card.c[property] : card[property];
};

export const initialize = (array, index, value) => {
  if (array[index] === null || array[index] === undefined) {
    array[index] = value;
  }
};

export const countCards = (cardsList) => {
  return cardsList.reduce((acc, card) => acc + card.q, 0);
};

export const countTotalCost = (cardsList, type) => {
  return cardsList
    .filter((card) => !isNaN(card.c[type]))
    .reduce((acc, card) => acc + card.q * card.c[type], 0);
};

export const isTriffle = (card, nativeLibrary) => {
  return (
    card.Type === MASTER &&
    nativeLibrary[card.Id][CARD_TEXT].toLowerCase().includes('trifle')
  );
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
