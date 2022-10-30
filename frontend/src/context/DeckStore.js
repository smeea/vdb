import { proxy } from 'valtio';

export const deckStore = proxy({
  deck: {},
  decks: {},
});

export const setDeck = (v) => {
  deckStore.deck = v;
};

export const setDecks = (v) => {
  deckStore.decks = v;
};
