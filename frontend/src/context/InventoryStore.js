import { proxy } from 'valtio';
import { deepClone } from '@/utils';
import { inventoryServices } from '@/services';

export const inventoryStore = proxy({
  crypt: {},
  library: {},
  isFrozen: false,
  cryptTimer: undefined,
  cryptTimers: [],
});

export const usedStore = proxy({
  crypt: {
    soft: {},
    hard: {},
  },
  library: {
    soft: {},
    hard: {},
  },
});

export const inventoryCardsAdd = (cards) => {
  const initialCryptState = deepClone(inventoryStore.crypt);
  const initialLibraryState = deepClone(inventoryStore.library);

  const filteredCards = {};
  Object.keys(cards)
    .filter((cardid) => !(cardid > 210000 || (cardid < 200000 && cardid > 110000)))
    .forEach((cardid) => {
      filteredCards[cardid] = cards[cardid];
    });

  inventoryServices.addCards(filteredCards).catch(() => {
    inventoryStore.crypt = initialCryptState;
    inventoryStore.library = initialLibraryState;
  });

  Object.values(filteredCards).forEach((card) => {
    const { q, c } = card;

    const store = c.Id > 200000 ? inventoryStore.crypt : inventoryStore.library;
    const isPositive = (store[c.Id]?.q || 0) + q > 0;
    if (isPositive) {
      if (store[c.Id]) {
        store[c.Id].q = store[c.Id].q + q;
      } else {
        store[c.Id] = {
          c: c,
          q: q,
        };
      }
    } else {
      delete store[c.Id];
    }
  });
};

export const inventoryCardChange = (card, q) => {
  if (card.Id > 210000 || (card.Id < 200000 && card.Id > 110000)) return;
  const cardSrc = card.Id > 200000 ? 'crypt' : 'library';
  const initialState = deepClone(inventoryStore[cardSrc])
  const store = inventoryStore[cardSrc]

  inventoryServices.setCard(card.Id, q).catch(() => {
    inventoryStore[cardSrc] = initialState;
  });

  if (q >= 0) {
    if (store[card.Id]) {
      store[card.Id].q = q;
    } else {
      store[card.Id] = {
        c: card,
        q: q,
      };
    }
  } else {
    delete store[card.Id];
  }
};

export const inventoryCardTextChange = (card, text) => {
  if (card.Id > 210000 || (card.Id < 200000 && card.Id > 110000)) return;
  const cardSrc = card.Id > 200000 ? 'crypt' : 'library';
  const initialState = deepClone(inventoryStore[cardSrc])
  const store = inventoryStore[cardSrc]

  inventoryServices.setCardText(card.Id, text).catch(() => {
    inventoryStore[cardSrc] = initialState;
  });

  if (store[card.Id]) {
    store[card.Id].t = text;
  } else {
    store[card.Id] = {
      q: 0,
      c: card,
      t: text,
    };
  }
};

export const inventoryUpdate = (field, value) => {
  const initialState = inventoryStore[field];
  inventoryStore[field] = value;
  inventoryServices.update(field, value).catch(() => {
    inventoryStore[field] = initialState;
  });
};

export const setupUsedInventory = (decks) => {
  const softCrypt = {};
  const softLibrary = {};
  const hardCrypt = {};
  const hardLibrary = {};
  const crypts = { h: hardCrypt, s: softCrypt };
  const libraries = { h: hardLibrary, s: softLibrary };

  Object.keys(decks).forEach((deckid) => {
    if (decks[deckid].inventoryType) {
      Object.entries(decks[deckid].crypt).forEach(([id, card]) => {
        const target = crypts[card.i || decks[deckid].inventoryType];
        if (!target[id]) target[id] = {};
        target[id][deckid] = card.q;
      });
      Object.entries(decks[deckid].library).forEach(([id, card]) => {
        const target = libraries[card.i || decks[deckid].inventoryType];
        if (!target[id]) target[id] = {};
        target[id][deckid] = card.q;
      });
    }
  });

  usedStore.crypt = {
    soft: softCrypt,
    hard: hardCrypt,
  };
  usedStore.library = {
    soft: softLibrary,
    hard: hardLibrary,
  };
};
