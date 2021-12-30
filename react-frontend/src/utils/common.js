import { CARD_TEXT, MASTER } from 'utils/constants';

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
    .map((c) => getCardProperty(c, 'Id'))
    .includes(getCardProperty(card, 'Id'));
};
